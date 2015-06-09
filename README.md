# CrawlerNodeJS
## Web Crawler written in NodeJS 

###What is CrawlerNodeJS

CrawlerNodeJS is a web crawler written in NodeJS that take in input one or more URL seeds, one or more keywords, scan seeds and other URLs founded.

CrawlerNodeJS save each urls founded in a MongoDb Database and for each keywords founded during scapring of page save it into a file. Is possibile see all file saved into ‘file’ directory.

CrawlerNodeJS use Async.queue to process each request. I used this approach to avoid recursion! 

###Installation & configuration
After download and install NodeJS and MongoDB and dipendence, Download this source code and start using ‘ node server.js ‘ command in your terminal. The server running on port 8081. 

###How start
Start CrawlerNodeJS is very simple. Open your terminal or Browser.

Terminal Case example:

curl --data "url1=http://it.wikipedia.org/wiki/Biologia_di_sintesi
&url2=http://en.wikipedia.org/wiki/Synthetic_biology
&url3=http://syntheticbiology.org/
&url4=http://www.systemsbiology.org/
&url5=http://www.synbioproject.org/
&url6=http://www.synberc.org/what-is-synbio
&url7=https://synbio.mit.edu/
&url8=http://www.igem.org/Main_Page
&url9=http://biobricks.org/
&url10=http://synbioconference.org/2014
&url11=http://synbio.berkeley.edu/
&url12=http://synbioconference.org/2015
&url13=http://www.globalengage.co.uk/synthetic-biology.html
&url14=http://www.embl.de/training/events/2015/SYN15-01/
&key1=PhD student&key2=synthetic biology&durata=1440" http://localhost:8081/crawler
 
You can change number of urls and Keys.  
 
###Credits

The code was developed as a project for University of Catania - Compilatori  in June 2015  

Fischetti Antonio (http://antoniofischetti.it)
        GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.

