using AmApp.Model;
using AmApp.Views.Components;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using Xamarin.Forms;

namespace AmApp.Layers.Service
{
    public class LoginService
    {
        public Usuario ValidLogin(Usuario _usuario)
        {

            var url = String.Format("http://10.0.2.2:3000/auth/login");
            string ContentType = "application/json";

            HttpClient client = new HttpClient();

            var conteudoJson = JsonConvert.SerializeObject(_usuario);
            var conteudoJsonString = new StringContent(conteudoJson, Encoding.UTF8, ContentType);

            var resposta = client.PostAsync(url, conteudoJsonString).Result;

            if (resposta.IsSuccessStatusCode || resposta.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                var resultado = resposta.Content.ReadAsStringAsync().Result;
                JObject _resultado = JsonConvert.DeserializeObject<JObject>(resultado);
                _usuario = GetValue(_resultado, _usuario);
                return _usuario;
            }
            else
            {
                var mensagem = "Erro ao conectar com servidor";
                DependencyService.Get<IMessage>().ShortAlert(mensagem);
                _usuario.ID_USUARIO = -1;
                return _usuario;
            }
        }

        private Usuario GetValue(JObject value, Usuario _usuario)
        {
            string status = (string)value.SelectToken("status");

            if (!status.Equals("401"))
            {
                var id = value.SelectToken("data");
                var len = id[0];
                _usuario.ID_USUARIO = (int)len.SelectToken("ID_USUARIO");
                return _usuario;
            }
            else
            {
                _usuario.ID_USUARIO = 0;
                return _usuario;
            }
        }
    }
}
