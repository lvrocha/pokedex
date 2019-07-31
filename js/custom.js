$(function(){
    //armazena a url da api
    var pokeapiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
    var pokemonByName = 'http://pokeapi.co/api/v2/pokemon/';

    //carrega o arquivo json
    $.getJSON(pokeapiURL).done(function(data){
        //imprime no console os dados do arquivo json
        console.log(data.results);
        //percorre o array pokemon_species
        $.each(data.results, function(index, pokemon){
            //formata para deixar com a primeira letra maiuscula
            var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            //formata o link
            var link = $("<a>").attr("id", pokemon.name).attr("href", "#").append($("<strong>").text(name));
            //adiciona o link no td
            var td = $("<td>").append(link);
            //função de clicar no link
            link.click(function(event){
                //carrega o arquivo json da nova url enviando o parametro name do pokemon.
                $.getJSON(pokemonByName + pokemon.name).done(function(details){
                    //cria variavel com o elemento #pokemon-details
                    var pokemonDiv = $("#pokemon-details");
                    //remove os elementos filhos do pokemonDiv
                    pokemonDiv.empty();
                    //acrescenta o nome do pokemon
                    pokemonDiv.append("<h2>" + name + "</h2>");
                    //verifica se retorna o sprite na api. em caso positivo exibe e caso negativo não
                    if(details.sprites.front_default != null){
                        pokemonDiv.append("<img src='" + details.sprites.front_default + "'>" );
                    }else{
                        pokemonDiv.append("<p>Sem sprite para esse pokemon :(</p>" );
                    }
                    //acrescenta o texto habilidades
                    pokemonDiv.append("<p><b>Habilidades</b></p>" );
                    //percorre as habilidades e exibe
                    $.each(details.abilities, function(index, habilidade){
                        pokemonDiv.append("<p>"+ habilidade.ability.name.charAt(0).toUpperCase()+habilidade.ability.name.slice(1)+"</p>");
                    });
                    //acrescenta o texto tipos
                    pokemonDiv.append("<p><b>Tipos</b></p>" );
                    //percorre os tipos e exibe
                    $.each(details.types, function(index, tipo){
                        console.log(tipo.type.name);
                        pokemonDiv.append("<p>"+ tipo.type.name.charAt(0).toUpperCase()+tipo.type.name.slice(1)+"</p>");
                    });
                    //acrescenta o texto peso
                    pokemonDiv.append("<p><b>Peso</b></p>" );
                    //busca na api o peso e exibe
                    pokemonDiv.append("<p>"+details.weight+"</p>");
                    //acrescenta um botão para limpar
                    pokemonDiv.append("<button id='limpar'>Fechar</button>");
                    $("#limpar").click(function(){
                        //ao clicar no botao limpar ele elimina os elementos filhos do pokemonDiv
                        pokemonDiv.empty();
                    });
                    //animação para subir para o topo da pagina
                    $('html, body').animate({scrollTop:0}, 'slow');
                });
                //nao deixa a acao padrao ser acionada.
                event.preventDefault();
            });
           
            //aramzena na variavel par um bloco tr com o nome do pokemon
            var par = $("<tr>").html("").append(td)
            //acrescenta no id pokemon a variavel par.
            par.appendTo("#pokemon");
        });
    }).fail(function(){
        //se a conexao com a api falhar retorna um erro
        console.log("Requisição falhou com pokeAPI");
    }).always(function(){
        console.log("PokeAPI OK");
    });

    


});
//funcao para busca da tabela
$(document).ready(function(){
    $('#search').keyup(function(){
        //chama a função search_table enviando o valor da busca
        search_table($(this).val());
    });   
    //funçao para buscar na tabela
    function search_table(value){
        $('#pokemon_table tr').each(function(){
            var found = 'false';
            $(this).each(function(){
                if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0 ) {
                    found = 'true';                    
                }
            });
            //mostra ou exibe o tr de acordo com a busca
            if(found == 'true'){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
    }
})