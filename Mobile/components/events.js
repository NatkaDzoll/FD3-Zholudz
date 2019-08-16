import {EventEmitter} from 'events';

// описываем поток событий
let mobileEvents = new EventEmitter();

// в потоке mobileEvents будут все события, связанные с данными клиентов
// событие "EvEditClient" - кликнуто редактирование клиента, его сэмиттирует MobClient и примет MobCompany
// событие "EvDeleteClient" - кликнуто удалинеи клиента, его сэмиттирует MobClient и примет MobCompany
// событие "EvClickSave" - кликнуто сохранение клиента, его сэмитирует ClientCard и примет MobCompany
// событие "EvClickCancel" - кликнуто сохранение клиента, его сэмитирует ClientCard и примет MobCompany

// лучше работать не с текстовыми литералами, а объявить переменные с соответствующими значениями

export {mobileEvents};
