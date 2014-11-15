angular.module('inklusik.services', [])

.service('Player', function(ngAudio, $cordovaMedia) {
    var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    var ctr = 1;
    function Player (name, url) {
        if (app) {
            var src = "/android_asset/www/sound/sunda/"+name+"/"+url+".mp3";

            var my_media = new Media(src, 
                function() { my_media.stop(); my_media.release();},
                function() { my_media.stop(); my_media.release();}); 
            my_media.play();
        } else {
            // console.log("sound/sunda/"+name+"/"+url+".mp3");
            ngAudio.play("sound/sunda/"+name+"/"+url+".mp3");
        }
    }
    return Player;
})

.service('Shake', function() {
    function Shake(options) {
      var shake = this,
        watchId = null,
        defaultOptions = {
          frequency: 300,
          waitBetweenShakes: 1000,
          threshold: 12,
          success: undefined,
          failure: undefined
        },
        previousAcceleration;
      for (var p in defaultOptions)
        if (!options.hasOwnProperty(p))
          options[p] = defaultOptions[p];
      
      // Start watching the accelerometer for a shake gesture
      shake.startWatch = function () {
        var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        if (app) {
          if (watchId)
            return;
          watchId = navigator.accelerometer.watchAcceleration(getAccelerationSnapshot, handleError, {
            frequency: options.frequency
          });
        }
      };
      
      // Stop watching the accelerometer for a shake gesture
      shake.stopWatch = function () {
        if (!watchId)
          return;
        navigator.accelerometer.clearWatch(watchId);
        watchId = null;
      };
      
      // Gets the current acceleration snapshot from the last accelerometer watch
      function getAccelerationSnapshot() {
        navigator.accelerometer.getCurrentAcceleration(assessCurrentAcceleration, handleError);
      }
      
      // Assess the current acceleration parameters to determine a shake
      function assessCurrentAcceleration(acceleration) {
        if (!previousAcceleration) {
          previousAcceleration = acceleration;
          return;
        }
        var accelerationDelta = {
          x: acceleration.x - previousAcceleration.x,
          y: acceleration.y - previousAcceleration.y,
          z: acceleration.z - previousAcceleration.z
        };
        var magnitude = Math.sqrt(
          Math.pow(accelerationDelta.x, 2) +
          Math.pow(accelerationDelta.y, 2) +
          Math.pow(accelerationDelta.z, 2)
        );
        if (magnitude >= options.threshold) {
          // Shake detected
          if (options.waitBetweenShakes > 0) {
            shake.stopWatch();
            previousAcceleration = undefined;
          }
          options.success.call(shake, magnitude, accelerationDelta, acceleration.timestamp);
          if (options.waitBetweenShakes > 0)
            setTimeout(
              function() {
                shake.startWatch();
              },
              options.waitBetweenShakes
            );
        }
        else
          previousAcceleration = acceleration;
      }
     
      // Handle errors here
      function handleError() {
        if (options.failure)
          options.failure.call(shake);
      }
    };
    return Shake;
})

.factory('Partiturs', function() {
  var self = this;
  self.partiturs = [
    {
      id: 1,
      title: 'Gundul Gundul Pacul',
      source: 'Jawa Tengah',
      melody: [
        'da2', 'la', 'da2', 'la',  'ti', 'na', 'na', '0', 'mi', 'da', 'mi', 'da', 'mi', 'na', '0', '0', 'da2', 'la', 'da2', 'la', 'ti', 'na', 'na', '0', 'mi', 'da', 'mi', 'da', 'mi', 'na', '0', 'da2', '0', 'la', '0', 'na', '0', 'ti', 'ti', 'na', 'ti', 'la', 'da2', 'ti', 'la', 'da2', '0', '0', 'da2', '0', 'la', '0', 'na', '0', 'ti', 'ti', 'na', 'ti', 'la', 'da2', 'ti', 'la', 'da2', '0'
      ],
      tick: '4/4',
    }
  ];
  return self;
})

.factory('Instruments', function() {
    var self = this;
    self.instruments = [ {
    description : "<p>Angklung adalah alat musik <strong>multitonal</strong> (bernada ganda) yang secara tradisional berkembang dalam masyarakat Sunda di Pulau Jawa bagian barat. Alat musik ini dibuat dari bambu, dibunyikan dengan cara digoyangkan (bunyi disebabkan oleh benturan badan pipa bambu) sehingga menghasilkan bunyi yang bergetar dalam susunan nada 2, 3, sampai 4 nada dalam setiap ukuran, baik besar maupun kecil.</p><p>Dictionary of the Sunda Language karya Jonathan Rigg, yang diterbitkan pada tahun 1862 di Batavia, menuliskan bahwa angklung adalah alat musik yang terbuat dari pipa-pipa bambu, yang dipotong ujung-ujungnya, menyerupai pipa-pipa dalam suatu organ, dan diikat bersama dalam suatu bingkai, digetarkan untuk menghasilkan bunyi. Angklung terdaftar sebagai <strong>Karya Agung Warisan Budaya Lisan</strong> dan <strong>Nonbendawi Manusia</strong> dari UNESCO sejak November 2010.</p>",
    howtoplay : "<p>Memainkan sebuah angklung sangat mudah. Seseorang tinggal memegang rangkanya pada salah satu tangan (biasanya tangan kiri) sehingga angklung tergantung bebas, sementara tangan lainnya (biasanya tangan kanan) <strong>menggoyangnya</strong> hingga berbunyi.</p>",
    image : "angklung.jpg",
    imagecover: "angklung-cover.jpg",
    location : "sunda",
    melody : [ "da", "mi", "na", "ti", "la", "da2" ],
    name : "angklung",
    story : "<p>Tidak ada petunjuk sejak kapan angklung digunakan, tetapi diduga bentuk primitifnya telah digunakan dalam kultur Neolitikum yang berkembang di Nusantara sampai awal penanggalan modern, sehingga angklung merupakan bagian dari relik pra-Hinduisme dalam kebudayaan Nusantara. Catatan mengenai angklung baru muncul merujuk pada masa <strong>Kerajaan Sunda</strong> (abad ke-12 sampai abad ke-16).</p><p>Asal usul terciptanya musik bambu, seperti angklung berdasarkan pandangan hidup masyarakat Sunda yang agraris dengan sumber kehidupan dari padi (pare) sebagai makanan pokoknya. Hal ini melahirkan mitos kepercayaan terhadap Nyai Sri Pohaci sebagai lambang Dewi Padi pemberi kehidupan (hirup-hurip). Masyarakat Baduy, yang dianggap sebagai sisa-sisa masyarakat Sunda asli, menerapkan angklung sebagai bagian dari <strong>ritual mengawali penanaman padi</strong>.</p><p>Permainan angklung gubrag di Jasinga, Bogor, adalah salah satu yang masih hidup sejak lebih dari 400 tahun lampau. Kemunculannya berawal dari ritus padi. Angklung diciptakan dan dimainkan untuk memikat Dewi Sri turun ke bumi agar tanaman padi rakyat tumbuh subur. Jenis bambu yang biasa digunakan sebagai alat musik tersebut adalah bambu hitam (awi wulung) dan bambu putih (awi temen). Tiap nada (laras) dihasilkan dari bunyi tabung bambunya yang berbentuk bilah (wilahan) setiap ruas bambu dari ukuran kecil hingga besar. Dikenal oleh masyarakat sunda sejak masa kerajaan Sunda, di antaranya sebagai penggugah semangat dalam pertempuran. Fungsi angklung sebagai pemompa semangat rakyat masih terus terasa sampai pada masa penjajahan, itu sebabnya pemerintah Hindia Belanda sempat melarang masyarakat menggunakan angklung, pelarangan itu sempat membuat popularitas angklung menurun dan hanya dimainkan oleh anak- anak pada waktu itu.</p><p>Selanjutnya lagu-lagu persembahan terhadap Dewi Sri tersebut disertai dengan pengiring bunyi tabuh yang terbuat dari batang-batang bambu yang dikemas sederhana yang kemudian lahirlah struktur alat musik bambu yang kita kenal sekarang bernama angklung. Demikian pula pada saat pesta panen dan seren taun dipersembahkan permainan angklung. Terutama pada penyajian Angklung yang berkaitan dengan upacara padi, kesenian ini menjadi sebuah pertunjukan yang sifatnya arak-arakan atau helaran, bahkan di sebagian tempat menjadi iring-iringan Rengkong dan Dongdang serta Jampana (usungan pangan) dan sebagainya. Dalam perkembangannya, angklung berkembang dan menyebar ke seantero Jawa, lalu ke Kalimantan dan Sumatera. Pada 1908 tercatat sebuah misi kebudayaan dari Indonesia ke Thailand, antara lain ditandai penyerahan angklung, lalu permainan musik bambu ini pun sempat menyebar di sana. Bahkan, sejak 1966, Udjo Ngalagena &mdash;tokoh angklung yang mengembangkan teknik permainan berdasarkan laras-laras pelog, salendro, dan madenda&mdash; mulai mengajarkan bagaimana bermain angklung kepada banyak orang dari berbagai komunitas.</p>"
  }, {
    description : "<p>Kacapi merupakan alat musik Sunda yang dimainkan sebagai alat musik utama dalam <strong>Tembang Sunda</strong> atau Mamaos Cianjuran dan kacapi suling. Rincian unsur nada dalam sebuah kacapi parahu. Kata kacapi dalam bahasa Sunda juga merujuk kepada tanaman sentul, yang dipercaya kayunya digunakan untuk membuat alat musik kacapi.</p>",
    howtoplay : "<p>Kecapi merupakan alat musik petik yang menghasilkan suara ketika senar digetarkan. Tinggi rendah nada dihasilkan dari panjang pendeknya dawai.</p>",
    image : "kacapi.jpg",
    imagecover: "kacapi-cover.jpg",
    location : "sunda",
    melody : [ "da", "mi", "na", "ti", "la", "da2" ],
    name : "kacapi",
    story : "<p>Alat musik kacapi lebih dikenal berasal dari <strong>China</strong> sejak berabad-abad lalu. Alat berdawai ini menjadi pengiring tembang-tembang merdu. Tak hanya di China, musik kacapi juga banyak di gunakan oleh beberapa pemusik tradisional di tanah air. Seperti halnya kebudayaan Sunda, alat kacapi merupakan alat musik kelasik yang selalu mewarnai beberapa kesenian di tanah Sunda ini.</p><p>Membuat kacapi bukanlah hal gampang.Meski sekilas tampak kacapi seperti alat musik sederhana, tetapi membuatnya tidaklah gampang. Untuk bahan bakunya saja terbuat dari kayu Kenanga yang terlebih dahulu direndam selama tiga bulan. Sedangkan senarnya, kalau ingin menghasilkan nada yang bagus, harus dari kawat suasa (logam campuran emas dan tembaga), seperti kacapi yang dibuat tempo dulu. Berhubung suasana saat ini harganya mahal, senar Kacapi sekarang lebih menggunakan kawat baja.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "kendang.jpg",
    imagecover: "kendang-cover.jpg",
    location : "sunda",
    melody : [ "dung", "dung2", "tuk", "tung", "tungtaktung" ],
    name : "kendang",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Akom adalah alat musik yang berbentuk seperti Angklung. Akan tetapi akom mempunyai ukuran yang lebih besar dan suara bass lebih terasa.</p>",
    howtoplay : "<p>Cara memainkannya seperti anglung. Seseorang tinggal memegang rangkanya pada salah satu tangan (biasanya tangan kiri) sehingga akom tergantung bebas, sementara tangan lainnya (biasanya tangan kanan) menggoyangnya hingga berbunyi.</p>",
    image : "akom.jpg",
    imagecover: "akom-cover.jpg",
    location : "sunda",
    melody : [ "da", "mi", "na", "ti", "la", "da2" ],
    name : "akom",
    story : "<p>Tidak ada petunjuk sejak kapan akom digunakan, tetapi diduga bentuk primitifnya telah digunakan dalam kultur Neolitikum yang berkembang di Nusantara sampai awal penanggalan modern, sehingga akom merupakan bagian dari relik pra-Hinduisme dalam kebudayaan Nusantara. Catatan mengenai akom baru muncul merujuk pada masa Kerajaan Sunda (abad ke-12 sampai abad ke-16).</p><p>Asal usul terciptanya musik bambu, seperti akom berdasarkan pandangan hidup masyarakat Sunda yang agraris dengan sumber kehidupan dari padi (pare) sebagai makanan pokoknya. Hal ini melahirkan mitos kepercayaan terhadap Nyai Sri Pohaci sebagai lambang Dewi Padi pemberi kehidupan (hirup-hurip). Masyarakat Baduy, yang dianggap sebagai sisa-sisa masyarakat Sunda asli, menerapkan akom sebagai bagian dari ritual mengawali penanaman padi.</p><p>Permainan akom gubrag di Jasinga, Bogor, adalah salah satu yang masih hidup sejak lebih dari 400 tahun lampau. Kemunculannya berawal dari ritus padi. akom diciptakan dan dimainkan untuk memikat Dewi Sri turun ke bumi agar tanaman padi rakyat tumbuh subur. Jenis bambu yang biasa digunakan sebagai alat musik tersebut adalah bambu hitam (awi wulung) dan bambu putih (awi temen). Tiap nada (laras) dihasilkan dari bunyi tabung bambunya yang berbentuk bilah (wilahan) setiap ruas bambu dari ukuran kecil hingga besar.</p><p>Dikenal oleh masyarakat sunda sejak masa kerajaan Sunda, di antaranya sebagai penggugah semangat dalam pertempuran. Fungsi akom sebagai pemompa semangat rakyat masih terus terasa sampai pada masa penjajahan, itu sebabnya pemerintah Hindia Belanda sempat melarang masyarakat menggunakan akom, pelarangan itu sempat membuat popularitas akom menurun dan hanya dimainkan oleh anak- anak pada waktu itu.</p><p>Selanjutnya lagu-lagu persembahan terhadap Dewi Sri tersebut disertai dengan pengiring bunyi tabuh yang terbuat dari batang-batang bambu yang dikemas sederhana yang kemudian lahirlah struktur alat musik bambu yang kita kenal sekarang bernama akom. Demikian pula pada saat pesta panen dan seren taun dipersembahkan permainan akom. Terutama pada penyajian akom yang berkaitan dengan upacara padi, kesenian ini menjadi sebuah pertunjukan yang sifatnya arak-arakan atau helaran, bahkan di sebagian tempat menjadi iring-iringan Rengkong dan Dongdang serta Jampana (usungan pangan) dan sebagainya.</p><p>Dalam perkembangannya, akom berkembang dan menyebar ke seantero Jawa, lalu ke Kalimantan dan Sumatera. Pada 1908 tercatat sebuah misi kebudayaan dari Indonesia ke Thailand, antara lain ditandai penyerahan akom, lalu permainan musik bambu ini pun sempat menyebar di sana. Bahkan, sejak 1966, Udjo Ngalagena &mdash;tokoh akom yang mengembangkan teknik permainan berdasarkan laras-laras pelog, salendro, dan madenda&mdash; mulai mengajarkan bagaimana bermain akom kepada banyak orang dari berbagai komunitas.</p>"
  }, {
    // DARI SINI SAMPE KE BAWAH MASIH DUMMY DESCIPTION
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "gangsa-cover.jpg",
    location : "bali",
    melody : [ "dang", "deng", "ding", "dong", "dung" ],
    name : "gangsa",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "gong-cover.jpg",
    location : "bali",
    melody : [ "besar", "sedang", "kecil"],
    name : "gong",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "kethuk-cover.jpg",
    location : "bali",
    melody : [ "dang", "deng", "ding" , "dong" , "dung"],
    name : "kethuk",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "ugal-cover.jpg",
    location : "bali",
    melody : [ "dang", "deng", "ding" , "dong" , "dung"],
    name : "ugal",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "bonang-cover.jpg",
    location : "jawa",
    melody : [ "ji", "lu", "ma", "nem", "ro"],
    name : "bonang",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "gender-cover.jpg",
    location : "jawa",
    melody : [ "ji", "lu", "ma", "nem", "ro"],
    name : "gender",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "kendhang-cover.jpg",
    location : "jawa",
    melody : [ "dang", "dlang", "lung", "nem", "ro"],
    name : "kendhang",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "saronpanembung-cover.jpg",
    location : "jawa",
    melody : [ "ji", "lu", "ma", "nem", "ro"],
    name : "saron panembung",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "saronpanerus-cover.jpg",
    location : "jawa",
    melody : [ "ji", "lu", "ma", "nem", "ro"],
    name : "saron panerus",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "genderang-cover.jpg",
    location : "kalimantan",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "genderang",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "ohyan-cover.jpg",
    location : "kalimantan",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "ohyan",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "kolintang-cover.jpg",
    location : "maluku",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "kolintang",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "sulingmaluku-cover.jpg",
    location : "maluku",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "suling maluku",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "sulingtoraja-cover.jpg",
    location : "maluku",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "suling toraja",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "sasando-cover.jpg",
    location : "nusa",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "sasando",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "tifa-cover.jpg",
    location : "papua",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "tifa",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "rebana-cover.jpg",
    location : "sumatera",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "rebana",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "saluang-cover.jpg",
    location : "sumatera",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "saluang",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "serunai-cover.jpg",
    location : "sumatera",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "serunai",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"
  }, {
    description : "<p>Kendang, kendhang, atau gendang adalah instrumen dalam <strong>gamelan Jawa Tengah</strong> yang salah satu fungsi utamanya mengatur irama. Instrument ini dibunyikan dengan tangan, tanpa alat bantu. Jenis kendang yang kecil disebut ketipung, yang menengah disebut kendang ciblon/kebar. Pasangan ketipung ada satu lagi bernama kendang gedhe biasa disebut kendang kalih.</p><p>Kendang kalih dimainkan pada lagu atau gendhing yang berkarakter halus seperti ketawang, gendhing kethuk kalih, dan ladrang irama dadi. Bisa juga dimainkan cepat pada pembukaan lagu jenis lancaran ,ladrang irama tanggung. Untuk wayangan ada satu lagi kendhang yang khas yaitu<strong> kendhang kosek</strong>. Kendang kebanyakan dimainkan oleh para pemain gamelan profesional, yang sudah lama menyelami budaya Jawa. Kendang kebanyakan di mainkan sesuai naluri pengendang, sehingga bila dimainkan oleh satu orang denga orang lain maka akan berbeda nuansanya.</p>",
    howtoplay : "<p>Secara umum, cara membunyikan ricikan kendhang adalah dengan dikebuk membrannya menggunakan telapak tangan atau jari jari tangan kanan dan kiri.</p>",
    image : "placeholder.jpg",
    imagecover: "talempong-cover.jpg",
    location : "sumatera",
    melody : [ "da", "da2", "la", "mi", "na", "ti"],
    name : "talempong",
    story : "<p>Menurut bukti sejarah, kelompok membranofon telah populer di Jawa sejak pertengahan abad ke-9 Masehi dengan nama: padahi, pataha (padaha), murawaatau muraba, mrdangga, mrdala, muraja, panawa, kahala, damaru, kendang. Istilah ‘padahi’ tertua dapat dijumpai pada prasasti Kuburan Candi yang berangka tahun 821 Masehi (Goris, 1930). Seperti yang tertulis pada kitab Nagarakrtagama gubahan Mpu Prapanca tahun 1365 Masehi (Pigeaud, 1960), istilah tersebut terus digunakan sampai dengan jaman Majapahit.</p>"

  } ];
    self.find = function(name) {
        return _.findWhere(self.instruments, {name : name});
    }
    return self;
})

.factory('Flickr', function($resource, $q) {
  var photosPublic = $resource('http://api.flickr.com/services/feeds/photos_public.gne', 
      { format: 'json', jsoncallback: 'JSON_CALLBACK' }, 
      { 'load': { 'method': 'JSONP' } });
      
  return {
    search: function(query) {
      var q = $q.defer();
      photosPublic.load({
        tags: query
      }, function(resp) {
        q.resolve(resp);
      }, function(err) {
        q.reject(err);
      })
      
      return q.promise;
    }
  }
})

.controller('FlickrCtrl', function($scope, Flickr) {

  var doSearch = ionic.debounce(function(query) {
    Flickr.search(query).then(function(resp) {
      $scope.photos = resp;
    });
  }, 500);
  
  $scope.search = function() {
    doSearch($scope.query);
  }

})

.directive('pushSearch', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var amt, st, header;

      $element.bind('scroll', function(e) {
        if(!header) {
          header = document.getElementById('search-bar');
        }
        st = e.detail.scrollTop;
        if(st < 0) {
          header.style.webkitTransform = 'translate3d(0, 0px, 0)';
        } else {
          header.style.webkitTransform = 'translate3d(0, ' + -st + 'px, 0)';
        }
      });
    }
  }
})

.directive('photo', function($window) {
  return {
    restrict: 'C',
    link: function($scope, $element, $attr) {
      var size = ($window.outerWidth / 3) - 2;
      $element.css('width', size + 'px');
    }
  }
});