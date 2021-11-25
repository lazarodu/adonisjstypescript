import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjetoCurtir from 'App/Models/ProjetoCurtir'

export default class ProjetoCurtirsController {
  public async index({ }: HttpContextContract) {
    const projetoCurtirDB = await ProjetoCurtir.all()
    return projetoCurtirDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = request.only(["projeto_id", "icone"])
    const projetoCurtirDB = await ProjetoCurtir.create({ ...data, userId: auth.user?.id })
    return projetoCurtirDB
  }

  public async show({ params }: HttpContextContract) {
    const projetoCurtirDB = await ProjetoCurtir.findOrFail(params.id)
    return projetoCurtirDB
  }

  public async update({ request, params }: HttpContextContract) {
    const projetoCurtirDB = await ProjetoCurtir.findOrFail(params.id)
    const { projeto_id, icone } = request.only(["projeto_id", "icone"])
    projetoCurtirDB.projetoId = projeto_id
    projetoCurtirDB.icone = icone
    await projetoCurtirDB.save()
    return projetoCurtirDB
  }

  public async destroy({ params }: HttpContextContract) {
    const projetoCurtirDB = await ProjetoCurtir.findOrFail(params.id)
    await projetoCurtirDB.delete()
    return projetoCurtirDB
  }
}
