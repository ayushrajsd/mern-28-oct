import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";
import { getAllMovies } from "../../api/movies";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

function MovieList() {
  const fakeMovies = [
    {
      key: "1",
      poster: "Sabarmati Report",
      name: "Sabarmati Report",
      description: "Real story of Sabarmati incident",
      duration: "2hr 30min",
      genre: "Thriller",
      language: "Hindi",
      releaseDate: "12-11-2024",
    },
    {
      key: "2",
      poster: "Amaran",
      name: "Amaran Rort",
      description: "Real story of Major Mukund Varadarajan",
      duration: "2hr 30min",
      genre: "nationalist",
      language: "Hindi",
      releaseDate: "12-11-2024",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState(fakeMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(ShowLoading());
    const response = await getAllMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map(function (item) {
        return { ...item, key: `movie${item._id}` };
      })
    );
    dispatch(HideLoading());
  };

  useEffect(() => {
    // getData();
  }, []);

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return <img src={data.poster} height={"115"} width={"75"} />;
      },
    },
    {
      title: "Movie name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => {
        return `${text} Min`;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YYYY");
      },
    },
    {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="d-flex justify-content-end">
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Movie
      </Button>
      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          formType={formType}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MovieList;
