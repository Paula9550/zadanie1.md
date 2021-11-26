//zaimportowanie modulow:
import node_iplocate from 'node-iplocate';
import http from 'http';
import public_ip from 'public-ip';
//informacje w logach:
const DATA = new Date();
console.log(`Data uruchomienia: ${DATA.getDate()}.${DATA.getMonth()+1}.${DATA.getFullYear()}` );
console.log("Imie i nazwisko atora serwera: Paulina Sulek");
console.log("Port TCP nasluchujacy gloszenia klienta: 8080");
//utworzenie serwera HTTP, nasluchujacego porty serwera i zwracajacego odpowiedzi:
http.createServer(async function (req,res) 
{
    //pobranie IP klienta laczacego sie z serwerem:
    var ip = await public_ip.v4();
    //zwrocenie IP klienta:
    res.write('Adres IP klienta: ' + ip + "\n");
    //lokalizacja klienta:
    await node_iplocate(ip).then(function(results) 
    {
        //zwrocenie daty i godz:
        res.write("Data i godzina w strefie czasowej klienta: " +
        new Date().toLocaleString('pl-PL', {timeZone: results.time_zone}));
    });
    res.end();
//port, na ktorym nasluchuje serwer:
}).listen(8080); 