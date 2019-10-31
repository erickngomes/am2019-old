using AmApp.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using AmApp.Layers.Service;
using AmApp.Layers.Business;
using AmApp.Views.Components;
using AmApp.Layers.Data;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using AmApp.Views;

namespace AmApp.ViewModel

{
    public class PesquisarPageViewModel : INotifyPropertyChanged
    {
        public ICommand PesquisarClickedCommand { get; }
        public List<Scraping> Scrapping { get; set; }
        public PesquisaStatus Pesquisa { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;
        protected virtual void NotifyPropertyChanged(string propertyName = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        public PesquisarPageViewModel()
        {

            Scrapping = new List<Scraping>();
            Pesquisa = new PesquisaStatus();
            Pesquisa.NOME_COMPLETO = "";
            Pesquisa.CPF = "826164832";
            Pesquisa.RG = "12";
            Pesquisa.Scraping = Scrapping;


            PesquisarClickedCommand = new Command(() => {
                try
                {
                    PesquisaStatus resultadoPesquisa = new PesquisaService().GetPesquisaRealizada(Pesquisa);
                    Global.PesquisaSelecionada = resultadoPesquisa;
                    var mensagem = "Pesquisa em andamento";
                    MessagingCenter.Send<ListaDePesquisaPage>(new ListaDePesquisaPage(), "ListaPageAbrir");
                    DependencyService.Get<IMessage>().ShortAlert(mensagem);

                }
                catch (Exception ex)
                {
                    App.MensagemAlerta("Erro ao fazer o Scrapping: " + ex.Message);
                }
            });

        }
       

    }
}
