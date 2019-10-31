using AmApp.ViewModel;
using Xamarin.Forms;
using AmApp.Views;
using System;
using AmApp.Layers.Business;

namespace AmApp
{
    public partial class App : Application
    {
        public App()
        {

            InitializeComponent();
            LoadGlobalVariables();
            // Definindo se deve apresentar tela de login ou ir para tela principal
            if (Model.Global.UsuarioLogado != null)
            {
                MainPage = new PrincipalPage();
            }
            else
            {
                MainPage = new LoginPage();
            }
          
        }

        protected override void OnStart()
        {
            MessagingCenter.Subscribe<LoginViewModel>(this, "LoginSucesso",
                (sender) =>
                {
                    MainPage = new PrincipalPage();
                });


            MessagingCenter.Subscribe<String>("", "Logoff",
                (sender) =>
                {
                    new LogoffBusiness().Logoff();
                    MainPage = new LoginPage();
                });

        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }

        internal static void LoadGlobalVariables()
        {
            Model.Global.UsuarioLogado = new UsuarioBusiness().GetUsuarioLogged();

        }

        internal static void MensagemAlerta(string texto)
        {
            App.Current.MainPage.DisplayAlert("Título", texto, "Ok");
        }
    }
}
