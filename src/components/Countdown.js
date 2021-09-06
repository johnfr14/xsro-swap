const Countdown = ({ counter }) => {
  let totalSeconds = counter;
  let day = Math.floor(totalSeconds / (24 * 3600));
  let hours = Math.floor((totalSeconds - day * 86400) / 3600);
  let min = Math.floor((totalSeconds - day * 86400 - hours * 3600) / 60);
  let sec = Math.floor(totalSeconds % 60);

  return (
    <>
      <p>You need to wait :</p>
      <p>
        {day} Days, {hours} Hours, {min} Minutes, {sec} Seconds
      </p>
    </>
  );
};

export default Countdown;
