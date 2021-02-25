
export default class LocalstorageService {

    static adicionar(chave, valor){
        localStorage.setItem(chave, JSON.stringify(valor))
    }

    static resgatar(chave){
        const item = localStorage.getItem(chave)
        return JSON.parse(item)
    }
}