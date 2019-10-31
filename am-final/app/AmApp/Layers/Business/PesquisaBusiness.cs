using AmApp.Layers.Service;
using AmApp.Model;
using AmApp.Views.Components;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace AmApp.Layers.Business
{
    public class PesquisaBusiness
    {

        public List<PesquisaStatus> GetListaDePesquisaStatus(Usuario _usuario)
        {

            PesquisaSatatusService ListaDePesquisaService = new Service.PesquisaSatatusService();
            List<PesquisaStatus> ListaDePesquisa = ListaDePesquisaService.GetPesquisaStatus(_usuario);
            return ListaDePesquisa;
        }

        private List<PesquisaStatus> listaDePesquisaStatus;
        public List<PesquisaStatus> ListaDePesquisaStatus
        {
            get
            {
                return listaDePesquisaStatus;
            }
            set
            {
                listaDePesquisaStatus = value;
            }
        }

        private List<Pesquisa> listaDePesquisa;
        public List<Pesquisa> ListaDePesquisa
        {
            get
            {
                return listaDePesquisa;
            }
            set
            {
                listaDePesquisa = value;
            }
        }
    }
}
