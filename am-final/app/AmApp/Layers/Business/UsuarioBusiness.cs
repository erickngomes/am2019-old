using AmApp.Layers.Service;
using AmApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AmApp.Layers.Business
{
    public class UsuarioBusiness
    {

        public Model.Usuario GetUsuarioLogged()
        {
            var usuario = new Data.UsuarioData().Get();

            if (usuario != null)
            {
                Global.UsuarioLogado = usuario;
            }

            return usuario;
        }


        public bool Login(Usuario _user)
        {
            LoginService service = new LoginService();
            _user = service.ValidLogin(_user);
            if(_user.ID_USUARIO == 0 || _user.ID_USUARIO == -1)
            {
                return false;
            }
            else
            {
                Global.UsuarioLogado = _user;
                return true;
            }

        }
    }
}
