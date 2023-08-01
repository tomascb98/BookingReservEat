package ProyectoIntegrador.BookingRestaurantes.service;

import ProyectoIntegrador.BookingRestaurantes.configuration.AwsConfig;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImagesS3Service {
    private final static  String BUCKET = "reserveat-statics";
    private final AwsConfig config = new AwsConfig();

    private final AmazonS3Client s3Client = (AmazonS3Client) config.getS3Client();

    public List<String> uploadFile(List<MultipartFile> imageFiles){
        List<String> imagesUrl = new ArrayList<>();
        for (MultipartFile multipartFile: imageFiles) {
            String extension = StringUtils.getFilenameExtension(multipartFile.getOriginalFilename());
            String key = String.format("%s.%s", UUID.randomUUID(),extension);
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            try{
                PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET, key, multipartFile.getInputStream(),objectMetadata);
                s3Client.putObject(putObjectRequest);
                String url = getObjectUrl(key);
                imagesUrl.add(url);
            } catch (IOException ex){
                throw new RuntimeException();
            }
        }
        return imagesUrl;
    }

    public String uploadSingleFile(MultipartFile imageFile) {
        String extension = StringUtils.getFilenameExtension(imageFile.getOriginalFilename());
        String key = String.format("%s.%s", UUID.randomUUID(), extension);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(imageFile.getContentType());

        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET, key, imageFile.getInputStream(), objectMetadata);
            s3Client.putObject(putObjectRequest);
            return getObjectUrl(key);
        } catch (IOException ex) {
            throw new RuntimeException("Error al cargar el archivo en Amazon S3: " + ex.getMessage());
        }
    }

    public void getObject(String key){
        S3Object s3Object = s3Client.getObject(BUCKET,key);
        ObjectMetadata metadata = s3Object.getObjectMetadata();


        try{
            S3ObjectInputStream inputStream = s3Object.getObjectContent();
            byte[] bytes = IOUtils.toByteArray(inputStream);
        } catch (IOException ex){
            throw new RuntimeException();
        }
    }

    void deleteObject(String key){
        s3Client.deleteObject(BUCKET,key);
    }

    public String getObjectUrl(String key){
        return String.format("https://%s.s3.amazonaws.com/%s",BUCKET,key);
    }
}
