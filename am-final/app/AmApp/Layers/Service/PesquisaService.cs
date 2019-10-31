using AmApp.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace AmApp.Layers.Service
{
    public class PesquisaService
    {


        public PesquisaStatus GetPesquisaRealizada(PesquisaStatus _pesquisa)
        {
            if (_pesquisa.RG == null || _pesquisa.RG.Length < 0)
            {
                _pesquisa.RG = "0";
            }

            var url = String.Format("http://10.0.2.2:3000/api/search?type=doc&user=" + Global.UsuarioLogado.ID_USUARIO + "&cpf=" + _pesquisa.CPF +"&rg="+_pesquisa.RG+ "&key=99999");
            HttpClient client = new HttpClient();
            var resposta = client.GetAsync(url).Result;
            if (resposta.IsSuccessStatusCode)
            {
                var resultado = resposta.Content.ReadAsStringAsync().Result;
                JObject _resultado = JsonConvert.DeserializeObject<JObject>(resultado);
                List<Scraping> listScraping = parseDataToScrapping(_resultado);
                _pesquisa.Scraping = listScraping;
                return _pesquisa;
            }
            else
            {
                throw new Exception("Erro ao fazer o scraping");
            }

        }

        public List<Scraping> parseDataToScrapping(JObject _resultado)
        {
            List<Scraping> scraping = new List<Scraping>();
            foreach (KeyValuePair<string, JToken> keyValuePair in _resultado)
            {
                
                if (keyValuePair.Value.ToString().Contains("Error"))
                {
                    Scraping scrap = new Scraping();
                    var errorMsg = keyValuePair.Value;

                    JArray JArrayError = JsonConvert.DeserializeObject<JArray>(errorMsg.ToString());

                    foreach (var i in JArrayError)
                    {
                        JObject JsonOb = JsonConvert.DeserializeObject<JObject>(i.ToString());
                        foreach (KeyValuePair<string, JToken> keyVal in JsonOb)
                        {
                            scrap.label = "";
                            scrap.value = keyVal.Value.ToString();
                            scrap.Error = "Busca online em progresso";
                            scraping.Add(scrap);
                        }

                    }
                    
                    
                }
                else if (keyValuePair.Key.Equals("data"))
                {
                    var str = keyValuePair.Value;
                    JObject JsonObjectX = JsonConvert.DeserializeObject<JObject>(str.ToString());
                

                    foreach (KeyValuePair<string, JToken> keyValue in JsonObjectX)
                    {
                        var keyValueX = keyValue.Value;
                        JArray JsonObjectY = JsonConvert.DeserializeObject<JArray>(keyValueX.ToString());

                        foreach(var i in JsonObjectY){
                            JObject JsonOb = JsonConvert.DeserializeObject<JObject>(i.ToString());
                            foreach (KeyValuePair<string, JToken> keyVal in JsonOb)
                            {
                                Scraping scrap = new Scraping();

                                var keyY = keyVal.Key;
                                var keyValueY = keyVal.Value;

                                scrap.label = keyY;
                                scrap.value = keyValueY.ToString();

                                scraping.Add(scrap);
                            }

                        }

                    }
                }
            }

            return scraping;
        }









        public Pesquisa GetScrapping(Pesquisa _pesquisa)
        {

            var url = String.Format("http://10.0.2.2:3001/api");
            string ContentType = "application/json";

            HttpClient client = new HttpClient();

            var conteudoJson = JsonConvert.SerializeObject(_pesquisa);
            var conteudoJsonString = new StringContent(conteudoJson, Encoding.UTF8, ContentType);
            var resposta = client.PostAsync(url, conteudoJsonString).Result;

            if (resposta.IsSuccessStatusCode)
            {
                var resultado = resposta.Content.ReadAsStringAsync().Result;
                JObject _resultado = JsonConvert.DeserializeObject<JObject>(resultado);
                List<Scraping> listScraping = GetJArrayValue(_resultado);
                _pesquisa.Scraping = listScraping;
                return _pesquisa;
            }
            else
            {
                throw new Exception("Erro ao fazer o scraping");
            }

             

        }

        private List<Scraping> GetJArrayValue(JObject JArray)
        {
            List<Scraping> listScraping = new List<Scraping>();
            foreach (KeyValuePair<string, JToken> keyValuePair in JArray)
            {
                Scraping scrap = new Scraping();
                var retorno = keyValuePair.Value;

                scrap.label = retorno["label"].ToString();
                scrap.value = retorno["value"].ToString();

                listScraping.Add(scrap);
            }
            return listScraping;
        }

    }
}
