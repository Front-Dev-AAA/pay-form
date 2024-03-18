import visa from '/img/visa.svg';
import mastercard from '/img/mastercard.svg';
import unionpay from '/img/unionpay.svg';
import americanExpress from '/img/american-express.svg';
import dinersClub from '/img/diners-club.svg';
import discover from '/img/discover.svg';
import elo from '/img/elo.svg';
import hiper from '/img/hiper.svg';
import hiperCard from '/img/hipercard.svg';
import jcb from '/img/jcb.svg';
import maestro from '/img/maestro.svg';
import mir from '/img/mir.svg';

export const createIconcard = () => {

    let iconCard = [{
            name: 'visa',
            src: visa
        }, {
            name: 'mastercard',
            src: mastercard
        }, {
            name: 'unionpay',
            src: unionpay
        },
        {
            name: 'americanExpress',
            src: americanExpress
        },
        {
            name: 'dinersClub',
            src: dinersClub
        },
        {
            name: 'discover',
            src: discover
        },
        {
            name: 'elo',
            src: elo
        },
        {
            name: 'hiper',
            src: hiper
        },
        {
            name: 'hiperCard',
            src: hiperCard
        },
        {
            name: 'jcb',
            src: jcb
        },
        {
            name: 'maestro',
            src: maestro
        },
        {
            name: 'mir',
            src: mir
        }
    ];
  

    return iconCard;
}