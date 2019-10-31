using System;
using System.Collections.Generic;
using System.Text;

namespace AmApp.Layers.Business
{
    class LogoffBusiness
    {

        public void Logoff()
        {
            new Data.UsuarioData().DropTables();
            Model.Global.UsuarioLogado = null;

        }


    }
}
