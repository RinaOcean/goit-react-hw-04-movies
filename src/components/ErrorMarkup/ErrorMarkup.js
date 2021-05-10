import errorImg from '../../error.png';
import './ErrorMarkup.scss';

const ErrorMarkup = () => {
  return (
    <div className="ErrorMarkup">
      <h1>Ooops!Something went wrong. Try again later</h1>
      <img width="300" src={errorImg} alt="sad face" />
    </div>
  );
};

export default ErrorMarkup;
