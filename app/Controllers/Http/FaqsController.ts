import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Faq from 'App/Models/Faq'

export default class FaqsController {
  public async index({ }: HttpContextContract) {
    const faqDB = await Faq.all()
    return faqDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = request.only(["pergunta", "resposta"])
    const faqDB = await Faq.create({ ...data, userId: auth.user?.id })
    return faqDB
  }

  public async show({ params }: HttpContextContract) {
    const faqDB = await Faq.findOrFail(params.id)
    return faqDB
  }

  public async update({ params, request }: HttpContextContract) {
    const faqDB = await Faq.findOrFail(params.id)
    const { pergunta, resposta } = request.only(["pergunta", "resposta"])
    faqDB.pergunta = pergunta
    faqDB.resposta = resposta
    await faqDB.save()
    return faqDB
  }

  public async destroy({ params }: HttpContextContract) {
    const projetoDB = await Faq.findOrFail(params.id)
    await projetoDB.delete()
    return projetoDB
  }
}
