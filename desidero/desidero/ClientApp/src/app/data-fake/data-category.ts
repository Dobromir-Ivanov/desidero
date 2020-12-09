import { Category } from './../dto/category';
const itam1 = new Category();
itam1.id = 1;
itam1.title = 'Строител/Строителство';
itam1.description = '';
itam1.createOn = new Date();


const itam2 = new Category();
itam2.id = 2;
itam2.title = 'Шивач/Шивашки услуги';
itam2.description = '';
itam2.createOn = new Date();


const itam3 = new Category();
itam3.id = 3;
itam3.title = 'Адвокат/Адвокатски услуги';
itam3.description = '';
itam3.createOn = new Date();


const itam4 = new Category();
itam4.id = 4;
itam4.title = 'Компютърен специалист/Информатика';
itam4.description = '';
itam4.createOn = new Date();


const itam5 = new Category();
itam5.id = 5;
itam5.title = 'Електротехника/Електрони услуги';
itam5.description = '';
itam5.createOn = new Date();


const itam6 = new Category();
itam6.id = 6;
itam6.title = 'Водопроводчик/Водопроводни услуги';
itam6.description = '';
itam6.createOn = new Date();






export const DataCategories = [
  itam1,
  itam2,
  itam3,
  itam4,
  itam5,
  itam6,
];
