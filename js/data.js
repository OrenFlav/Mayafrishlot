/* ============================================================
   ADMIN: EDIT THIS FILE TO ADD MODULES
   1. Put each PDF in its grading folder, e.g. files/unang-markahan/
   2. Add one line to that grading's "items" list:
        { title: "Aralin 3: Pamagat", file: "aralin-3.pdf", docx: "aralin-3.docx" }
   The "docx" part is optional. Leave it out if there is no Word copy.
   ============================================================ */
const GRADINGS = [
  {
    id: "q1",
    name: "Unang Markahan",
    short: "Unang Markahan",
    folder: "files/unang-markahan/",
    items: [
      {
        title: "Aralin 1: Katangiang Pisikal ng Asya",
        file: "AP 7 Q1 Module 1.pdf",
      },
      {
        title: "Aralin 2: Kahalagahan ng Ugnayan ng Tao at Kapaligiran",
        file: "AP 7 Q1 Module 2.pdf",
      },
      {
        title: "Aralin 3: Mga Likas na Yaman ng Asya",
        file: "AP 7 Q1 Module 3.pdf",
      },
      {
        title:
          "Aralin 4: Implikasyon ng Likas na Yaman sa Pamumuhay ng mga Asyano",
        file: "AP 7 Q1 Module 4.pdf",
      },
      {
        title: "Aralin 5: Pangangalaga sa Timbang na Ekolohiko ng Asya",
        file: "AP 7 Q1 Module 5.pdf",
      },
      {
        title:
          "Aralin 6: Komposisyon ng Populasyon at Kahalagahan ng Yamang Tao sa Asya",
        file: "AP 7 Q1 Module 6.pdf",
      },
    ],
  },
  {
    id: "q2",
    name: "Ikalawang Markahan",
    short: "Ikalawang Markahan",
    folder: "files/ikalawang-markahan/",
    items: [
      {
        title: "Aralin 1: Ang Konsepto ng Kabihasnan at ang mga Katangian Nito",
        file: "AP 7 Q2 Module 1.pdf",
      },
      {
        title:
          "Aralin 2: Mga Sinaunang Kabihasnan sa Asya (Sumer, Indus, Shang)",
        file: "AP 7 Q2 Module 2.pdf",
      },
      {
        title:
          "Aralin 3: Impluwensiya ng mga Kaisipang Asyano sa Kalagayang Panlipunan",
        file: "AP 7 Q2 Module 3.pdf",
      },
      {
        title: "Aralin 4: Mga Kaisipang Asyano sa Pagbuo ng mga Imperyo",
        file: "AP 7 Q2 Module 4.pdf",
      },
      {
        title:
          "Aralin 5: Kalagayan at Bahaging Ginagampanan ng Kababaihan sa Asya Mula sa Sinaunang Kabihasnan at Ika-16 na Siglo",
        file: "AP 7 Q2 Module 5.pdf",
      },
      {
        title:
          "Aralin 6: Mga Kontribusyon ng mga Sinaunang Lipunan at Komunidad sa Asya",
        file: "AP 7 Q2 Module 6.pdf",
      },
    ],
  },
  {
    id: "q3",
    name: "Ikatlong Markahan",
    short: "Ikatlong Markahan",
    folder: "files/ikatlong-markahan/",
    items: [
      {
        title:
          "Aralin 1: Unang Yugto ng Kolonyalismo at Imperyalismo ng mga Kanluranin sa Timog at Kanlurang Asya",
        file: "AP 7 Q3 Module 1.pdf",
      },
      {
        title:
          "Aralin 2: Nasyonalismo sa Pagbuo ng mga Bansa sa Timog at Kanlurang Asya",
        file: "AP 7 Q3 Module 2.pdf",
      },
      {
        title:
          "Aralin 3: Karanasan at Implikasyon ng Digmaang Pandaigdig sa Kasaysayan ng mga Bansang Asyano",
        file: "AP 7 Q3 Module 3.pdf",
      },
      {
        title:
          "Aralin 4: Kaugnayan ng Ibat Ibang Ideolohiya sa Pag-usbong ng Nasyonalismo at Kilusang Nasyonalista",
        file: "AP 7 Q3 Module 4.pdf",
      },
      {
        title:
          "Aralin 5: Mga Samahang Pangkababaihan at mga Kalagayang Panlipunan",
        file: "AP 7 Q3 Module 5.pdf",
      },
      {
        title:
          "Aralin 6: Ang Pagwawakas ng Imperyalismo sa Timog at Kanlurang Asya",
        file: "AP 7 Q3 Module 6.pdf",
      },
      {
        title:
          "Aralin 7: Bahaging Ginampanan ng Relihiyon sa Aspekto ng Pamumuhay ng mga Asyano",
        file: "AP 7 Q3 Module 7.pdf",
      },
      {
        title:
          "Aralin 8: Anyo at Tugon sa Neokolonyalismo ng Timog at TimogKanlurang Asya",
        file: "AP 7 Q3 Module 8.pdf",
      },
      {
        title:
          "Aralin 9: Kontribusyon ng Timog at Kanlurang Asya at ang Pagkakakilanlan ng Kulturang Asyano",
        file: "AP 7 Q3 Module 9.pdf",
      },
    ],
  },
  {
    id: "q4",
    name: "Ika-apat na Markahan",
    short: "Ika-apat na Markahan",
    folder: "files/ika-apat-na-markahan/",
    items: [
      {
        title:
          "Aralin 1: Kolonyalismo at Imperyalismo sa Silangann at Timog-Silangang Asya",
        file: "AP 7 Q4 Module 1.pdf",
      },
      {
        title: "Aralin 2: Nasyonalismo sa Silangan at Timog-Silangang Asya",
        file: "AP 7 Q4 Module 2.pdf",
      },
      {
        title:
          "Aralin 3: Epekto ng Pandaigdigang Digmaan sa Hilagang-Silangan at Timog-Silangang Asya",
        file: "AP 7 Q4 Module 3.pdf",
      },
      {
        title: "Aralin 4: Mga Kababaihan sa Asya",
        file: "AP 7 Q4 Module 4.pdf",
      },
      {
        title:
          "Aralin 5: Bahaging Ginampananng Kababaihan sa Hilagang-Silanganat Timog-Silangang Asya",
        file: "AP 7 Q4 Module 5.pdf",
      },
      {
        title:
          "Aralin 6: Bahaging Ginampanan ng Nasyonalismo sa Pagbibigay Wakas sa Imperyalismo sa Silangan at Timog-Silangang Asya",
        file: "AP 7 Q4 Module 6.pdf",
      },
      {
        title:
          "Aralin 7: Bahaging Ginampanan ng Relihiyon sa Aspekto ng Pamumuhay sa Hilagang-Silangan at Timog Silangang Asya",
        file: "AP 7 Q4 Module 7.pdf",
      },
      {
        title:
          "Aralin 8: Mga Anyo, Tugon, at Epekto ng Neokolonyalismo sa Silangan at Timog-Silangang Asya",
        file: "AP 7 Q4 Module 8.pdf",
      },
      {
        title:
          "Aralin 9: Mga Kontribusyon ng Silangan at Timog-Silangang Asya  sa Kulturang Asyano",
        file: "AP 7 Q4 Module 9.pdf",
      },
    ],
  },
  {
    id: "gawain",
    name: "Gawain",
    short: "Gawain",
    folder: "files/gawain/",
    sub: "Piliin ang gawain na gusto mong buksan o i-download.",
    items: [
      {
        title: "Gawain sa Unang Markahan",
        file: "QUARTER 1 (GAWAIN).pdf",
      },
      {
        title: "Gawain sa Ikalawang Markahan",
        file: "QUARTER 2 (GAWAIN).pdf",
      },
      {
        title: "Gawain sa Ikatlong Markahan",
        file: "QUARTER 3 (GAWAIN).pdf",
      },
      {
        title: "Gawain sa Ika-Apat na Markahan",
        file: "QUARTER 4 (GAWAIN).pdf",
      },
    ],
  },
  { id:"palaro", name:"PALARO", short:"PALARO", type:"links",
    sub:"Maglaro habang nagre-review.",
    items:[
      { title:"Give or Keep: Unang Markahan", game:"files/palaro/q1-give-or-keep-setup.json",
        desc:"Laro ng dalawang team. Review sa Unang Markahan." },
      { title:"Give or Keep: Ikalawang Markahan", game:"files/palaro/q2-give-or-keep-setup.json",
        desc:"Laro ng dalawang team. Review sa Ikalawang Markahan." ,
       { title:"Give or Keep: Ikatlong Markahan", game:"files/palaro/q3-give-or-keep-setup.json",
        desc:"Laro ng dalawang team. Review sa Unang Markahan." },
       { title:"Give or Keep: Ika Apat na Markahan", game:"files/palaro/q4-give-or-keep-setup.json",
        desc:"Laro ng dalawang team. Review sa Unang Markahan." }
    ]
  }
];
