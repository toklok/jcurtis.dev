import { h } from 'preact';

export default Location = ({ locations }) => {
  return (
    <div>
      {locations.map((el) => (
          <div>el {el}</div>  
      ))}
    </div>
  );
};
