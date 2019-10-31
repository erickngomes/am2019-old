using AmApp.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Text;

namespace AmApp.Layers.Service
{
    public class PesquisaSatatusService
    {
        public List<PesquisaStatus> GetPesquisaStatus(Usuario _usuario)
        {
            var u = _usuario;
            var url = String.Format("http://10.0.2.2:3000/api/historic?id=" + _usuario.ID_USUARIO);

            HttpClient client = new HttpClient();
            var resposta = client.GetAsync(url).Result;

            if (resposta.IsSuccessStatusCode)
            {
                var resultado = resposta.Content.ReadAsStringAsync().Result;
                JObject _resultado = JsonConvert.DeserializeObject<JObject>(resultado);
                List<PesquisaStatus> pesquisaStatus = GetValue(_resultado);
                return pesquisaStatus;
            }
            else
            {
                throw new Exception("Erro ao fazer o scraping");
            }
        }

        private List<PesquisaStatus> GetValue(JObject value)
        {
            var listData = value.SelectToken("data");
            List<PesquisaStatus> lstPesquisa = new List<PesquisaStatus>();

            foreach (var list in listData)
            {
                PesquisaStatus pesquisaStat = new PesquisaStatus();
                pesquisaStat.ID_PESSOA = (int)list.SelectToken("ID_PESSOA");
                pesquisaStat.CPF = (String)list.SelectToken("CPF");
                pesquisaStat.PESQUISA_STATUS = (String)list.SelectToken("PESQUISA_STATUS");
                pesquisaStat.NOME_COMPLETO = (String)list.SelectToken("NOME_COMPLETO");
                lstPesquisa.Add(pesquisaStat);
            }
            return lstPesquisa;
        }
    }
}
