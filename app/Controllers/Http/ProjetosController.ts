import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Projeto from 'App/Models/Projeto'

export default class ProjetosController {
  public async index({ }: HttpContextContract) {
    const projetoDB = await Projeto.all()
    return projetoDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = request.only(["projeto"])
    const projetoDB = await Projeto.create({ ...data, userId: auth.user?.id })
    return projetoDB
  }

  public async show({ params }: HttpContextContract) {
    const projetoDB = await Projeto.findOrFail(params.id)
    return projetoDB
  }

  public async update({ params, request }: HttpContextContract) {
    const projetoDB = await Projeto.findOrFail(params.id)
    const { projeto } = request.only(["projeto"])
    projetoDB.projeto = projeto
    await projetoDB.save()
    return projetoDB
  }

  public async destroy({ params }: HttpContextContract) {
    const projetoDB = await Projeto.findOrFail(params.id)
    await projetoDB.delete()
    return projetoDB
  }
}
