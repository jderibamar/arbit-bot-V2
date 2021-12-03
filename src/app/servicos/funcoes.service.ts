import { Injectable } from '@angular/core'

@Injectable()
export class Funcoes
{
    pdCpVd(mCom = [], exCp = '', exVd = '', exCp2 = '', exVd2 = '') //Identifica a pedra de Compra e Venda
    {
        let pdCpEx1 = 0,
            pdVdEx1 = 0,
            pdCpEx2 = 0,
            pdVdEx2 = 0,
            lucro = 0,
            arrPrintar = [],
            maLucro = 0 //para garantir o maior lucro quando houver

        for(let i in mCom)
        {
            pdCpEx1 = mCom[i].pdCpEx1
            pdVdEx1 = mCom[i].pdVdEx1
            pdCpEx2 = mCom[i].pdCpEx2
            pdVdEx2 = mCom[i].pdVdEx2


            if(pdCpEx1 > pdVdEx2 && pdVdEx2 > 0)
            {
                lucro = (pdCpEx1 - pdVdEx2) / pdVdEx2 * 100
                maLucro = lucro
                if(lucro >= 2)
                {
                    arrPrintar
                    .push({ symbol: mCom[i].symbol, pdCp: pdCpEx1, pdVd: pdVdEx2, excCp: exCp, excVd: exVd, lucro: lucro })
                }
            }
            
            if(pdCpEx2 > pdVdEx1 && pdVdEx1 > 0) 
            {
                lucro = (pdCpEx2 - pdVdEx1) / pdVdEx1 * 100

                if(lucro >= 2 && lucro > maLucro)
                {
                    arrPrintar
                    .push({ symbol: mCom[i].symbol, pdCp: pdCpEx2, pdVd: pdVdEx1, excCp: exCp2, excVd: exVd2, lucro: lucro })
                }                    
            }
        }

        return arrPrintar
    }

    exlcuirMoeda(arrMoedas = [], moRetirar = [])
    {
        for(let i in moRetirar) //laço para excluir moedas falsa-positiva
        {
            for(let j = 0; j < arrMoedas.length; j++)
            {
                if(moRetirar[i] == arrMoedas[j].symbol)
                    arrMoedas.splice(j, 1)
            }
        }
    }

    async excluirInativas(api_url = '')
    {
        let apiEx  = api_url,
            apiDados = await fetch(apiEx),
            allCurr = await apiDados.json(),
            inativas = [],
            inativasUSDT = [],
            inativasBTC = [],
            inativasETH = [],
            mercInativas = [],
            valores = []

        const keysAllCurr = Object.keys(allCurr)
        valores = Object.values(allCurr)


        for(let i in valores)
        {
            if(!valores[i].payin_enabled)
                inativas.push(keysAllCurr[i])

            // console.log('Chaves ativas: ', keysAtivas[i], ' Valores: ', valAtivos[i])
        }

        for(let i = 0; i < inativas.length; i++)
        {
            inativasUSDT[i] = inativas[i] + 'USDT'
        }

        for(let i = 0; i < inativas.length; i++)
        {
            inativasBTC[i] = inativas[i] + 'BTC'
        }

        for(let i = 0; i < inativas.length; i++)
        {
            inativasETH[i] = inativas[i] + 'ETH'
        }

        return mercInativas.push(...inativasBTC, ...inativasETH, ...inativasUSDT)
    }
}