
using AmApp.Layers.Service;
using AmApp.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Xamarin.Forms;

namespace AmApp.ViewModel
{
    public class PesquisaDetalheViewModel
    {

        public PesquisaDetalheViewModel()
        {
            Pesquisa = Global.PesquisaSelecionada;
            PesquisaService service = new PesquisaService();
            Pesquisa = service.GetPesquisaRealizada(Pesquisa);
            ScrappingList = pesquisa.Scraping;
        }

        public void PosicaoDetalheViewModel(Model.PesquisaStatus _pesquisa)
        {
            Pesquisa = _pesquisa;
        }


        private List<Scraping> scrappingList;
        public List<Scraping> ScrappingList
        {
            get
            {
                return scrappingList;
            }
            set
            {
                scrappingList = value;
            }
        }

        private Model.PesquisaStatus pesquisa;
        public Model.PesquisaStatus Pesquisa
        {
            get
            {
                return pesquisa;
            }
            set
            {
                pesquisa = value;
            }
        }
    }
}
