class UsuarioModel{
    constructor(pId, pNombre,pTipoUsuario, pCapacidad, pPaginaWeb, pMision, pVision, pDireccion, pRol, pTelefono, pProvincia, pPassword){
        this.id = pId;
        this.nombre = pNombre;
        this.tipoUsuario = pTipoUsuario;
        this.capacidad = pCapacidad;
        this.paginaWeb = pPaginaWeb;
        this.mision = pMision;
        this.vision = pVision;
        this.direccion = pDireccion;
        this.rol = pRol;
        this.telefono = pTelefono;
        this.provincia = pProvincia;
        this.password = pPassword;
    }

    setNombre(pNombre){
        this.nombre = pNombre;
    }

    setTipoUsuario(tipo){
        this.tipoUsuario = tipo;
    }

    setCapacidad(cap){
        this.capacidad = cap;
    }

    setPaginaWeb(pagina){
        this.paginaWeb = pagina;
    }

    setMision(mis){
        this.mision = mis;
    }

    setVision(vis){
        this.vision = vis;
    }

    setDireccion(dir){
        this.direccion = dir;
    }

    setRol(r){
        this.rol = r;
    }

    setTelefono(tel){
        this.telefono = tel;
    }

    setProvincia(prov){
        this.provincia = prov;
    }
}
module.exports = UsuarioModel;