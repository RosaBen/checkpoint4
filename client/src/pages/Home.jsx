import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/booking");
  };
  return (
    <div>
      <h1>Coaching RollerDance</h1>
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quis
          quisquam modi aperiam unde nemo et libero dolore, maxime saepe? Ad
          placeat nulla non necessitatibus sunt at, voluptate quia dolores?
          Officiis eaque molestias ut ex soluta! Iure ab quam numquam molestiae
          voluptates blanditiis in, cum quia quasi impedit! Assumenda maxime
          aliquam eos a necessitatibus placeat ad delectus laboriosam, sint
          culpa!
        </p>
        <img src="test.jpg" alt="logo" />
        <button type="button" onClick={handleClick}>
          Réserver
        </button>
      </section>
    </div>
  );
}
