# Configuración de proveedor
provider "aws" {
  region = "us-east-2"
}

# Crear VPC
resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "reserveat-vpc"
  }
}

# Crear subredes
resource "aws_subnet" "my_subnet" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.0.0/24"
  tags = {
    Name = "mi-subred-1"
  }
}

# Crear instancias EC2 para el backend
resource "aws_instance" "my_instance" {
  ami           = "ami-08333bccc35d71140"
  instance_type = "t2.micro"
  count         = 1
  tags = {
    Name = "reserveat-jump-server-tf"
  }

  vpc_security_group_ids = [aws_security_group.my_sg.id]
  subnet_id              = aws_subnet.my_subnet.id
}

# Crear security group
resource "aws_security_group" "my_sg" {
  name        = "reserveat-jump-server-sg-tf"
  description = "reserveat-jump-server-sg-tf"

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Crear buckets S3
resource "aws_s3_bucket" "client_bucket" {
  bucket = "reserveat-client-tf"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::reserveat-client-tf/*"
    }
  ]
}
EOF
}

resource "aws_s3_bucket" "statics_bucket" {
  bucket = "reserveat-statics-tf"
  acl    = "public-read"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::reserveat-statics-tf/*"
    }
  ]
}
EOF
}
