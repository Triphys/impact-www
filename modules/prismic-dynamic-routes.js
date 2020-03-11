
const Prismic = require('prismic-javascript')
const fse = require('fs-extra')
const dotenv = require('dotenv')
dotenv.config()


export default async function asyncModule (context, error, req) {

	try{

		// GET
	    const api = await Prismic.getApi(process.env.PRISMIC_API, {req})


	    const prismicContentRes = await api.query([
	        Prismic.Predicates.at('document.type', 'content')
	    ])
	    const prismicContent = prismicContentRes.results.map((cont) => {
		    return '/content/'+cont.uid
		})


		const prismicContactRes = await api.query([
	        Prismic.Predicates.at('document.type', 'contact')
	    ])
	    const prismicContact = prismicContactRes.results.map((cont) => {
		    return '/'+cont.uid
		})

		const routes = prismicContent.concat(prismicContact)

		console.log(routes);
	    
	    fse.outputJSON('./_data/prismic-routes.json', routes, { spaces: 4 })

    } catch (e) {
      console.log(e)
    }

}