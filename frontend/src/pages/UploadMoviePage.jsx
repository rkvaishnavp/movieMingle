import React, { useEffect, useState } from "react";
import { CiTrash, CiCirclePlus } from "react-icons/ci";
import axios from "axios";

const UploadMoviePage = () => {
  const [inputs, setInputs] = useState({
    name: "",
    year: "",
    plot: "",
    actors: [
      {
        name: "",
        role_name: "",
        role_type: "",
      },
    ],
    movie_pic: "",
    movie_url: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    console.log(inputs);
  };

  const [actors, setActors] = useState([
    {
      name: "",
      role_name: "",
      role_type: "",
    },
  ]);
  const handleActorChange = (index, field, value) => {
    const newActors = [...actors];
    newActors[index][field] = value;
    setActors(newActors);
  };
  const handleAddActor = () => {
    setActors([...actors, { name: "", role_name: "", role_type: "" }]);
  };
  const handleRemoveActor = (index) => {
    const newActors = [...actors];
    if (newActors.length > 1) {
      newActors.splice(index, 1);
      setActors(newActors);
    }
  };

  let movie = null;
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);

  const handleUploadMovie = async () => {
    const reader = new FileReader();
    let image = null;
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      image = base64String;
      console.log(image);
    };

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("year", inputs.year);
    formData.append("plot", inputs.plot);
    formData.append("actors", inputs.actors);
    formData.append("picture", image);
    formData.append("video", movie);

    try {
      const res = await fetch("/api/movie/uploadMovie", {
        method: "POST",
        body: formData,
      });
      // console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[70%] pt-6 pb-8 mb-4">
      <form className="shadow-md rounded px-4 pt-6 pb-8 mb-4 bg-slate-500">
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="John Doe"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Plot
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            name="plot"
            placeholder="Once Upon a Time..."
            value={inputs.plot}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Year
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            name="year"
            type="number"
            min={"1900"}
            max={new Date().getFullYear()}
            placeholder={new Date().getFullYear()}
            value={inputs.year}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Actors
          </label>
          <div className="flex flex-col items-center">
            {actors.map((actor, index) => (
              <div
                key={index}
                className="flex flex-row justify-around items-center mt-4"
              >
                <p>{index + 1}</p>
                <div className="w-[28%]">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Name"
                    value={actor.name}
                    onChange={(e) =>
                      handleActorChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="w-[28%]">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Role Name"
                    value={actor.role_name}
                    onChange={(e) =>
                      handleActorChange(index, "role_name", e.target.value)
                    }
                  />
                </div>
                <div className="w-[28%]">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Role Type"
                    value={actor.role_type}
                    onChange={(e) =>
                      handleActorChange(index, "role_type", e.target.value)
                    }
                  />
                </div>
                <div className="w-1/12">
                  <button
                    type="button"
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleRemoveActor(index)}
                  >
                    <CiTrash className="text-black" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="bg-green-500 text-balck h-10 my-3 rounded flex flex-row justify-around items-center w-[15%]"
              onClick={handleAddActor}
            >
              Add Actor
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Upload Movie Picture
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-slate-300"
            aria-describedby="file_input_help"
            name="movie_picture"
            accept="image/*"
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <p className="m-1 text-sm text-green-500">PNG, JPG (MAX. 5mb).</p>
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Upload Movie Video
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-slate-300"
            aria-describedby="file_input_help"
            name="movie_video"
            accept="video/*"
            type="file"
            onChange={(e) => (movie = e.target.files[0])}
          />
          <p className="m-1 text-sm text-green-500">MP4, MKV (MAX. 5mb).</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleUploadMovie}
          >
            Upload Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadMoviePage;
