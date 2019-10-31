using AmApp.Model;
using AmApp.Views.Components;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;



namespace AmApp.ViewModel
{
    public class LoginViewModel : INotifyPropertyChanged
    {


        public event PropertyChangedEventHandler PropertyChanged;
        protected virtual void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }


        public ICommand EntrarClickedCommand { get; private set; }




        public Usuario _usuario;
        public Usuario Usuario
        {
            get
            {
                return _usuario;
            }
            set
            {
                _usuario = value;
                NotifyPropertyChanged();
            }
        }


        public LoginViewModel()
        {

            Usuario = new Usuario
            {
                login = "GilCosta12",
                password = "232324"
            };


            EntrarClickedCommand = new Command(() => {
                var usuarioValidado = new Layers.Business.UsuarioBusiness().Login(Usuario);
                if (usuarioValidado)
                {
                    MessagingCenter.Send<LoginViewModel>(this, "LoginSucesso");
                }
                else
                {
                    var mensagem = "Usuário ou senha incorreto";
                    DependencyService.Get<IMessage>().ShortAlert(mensagem);
                }
                    

            });



        }




    }


}
