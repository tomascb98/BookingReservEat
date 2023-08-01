import { useContextGlobal } from '../utils/global.context'
import "../styles/componentStyle/Policies.css";

const Policies = ({product}) => {
  const { rules, policies } = useContextGlobal()
  

  return (
    <div className="politicas">
        <h2>Qué tenés que saber</h2>
        <hr />
        <section>
          <article>
            <h3>Normas de la casa</h3>
            {/* {rules.map(rule => 
                product.id === rule.id?
                <p key={rule.id}> 
                { rule.description} 
                </p> : "")
            } */}
          {
            product.rule_description.map((item, key) => {
              return (
                <p key={key}>{ "- " + item}</p>
              )
            })
          }
          </article>

          <article>
            <h3>Política de cancelación</h3>
          {
            product.policy_description.map((item, key) => {
              return (
                <p key={key}>{ "- " + item}</p>
              )
            })
          }
            
          </article>
        </section>
      </div>
  )
}

export default Policies