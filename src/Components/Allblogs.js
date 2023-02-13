import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "../Firebase/firebaseConfig";
import Deleteblogs from "./Deleteblogs";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Likeblog from "./Likeblog";
import { TfiCommentAlt } from "react-icons/tfi";

const Allblogs = () => {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const ArticleRef = collection(db, "Articles");
    const q = query(ArticleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  }, []);

  console.log(articles);

  return (
    <div className="max-w-[90%] mx-auto my-10 text-white">
      <div className="text-4xl  lex font-bold text-center pb-10 ">
        <p>
          Want to write something?{" "}
          <Link to="/login">
            <span className="text-[#6EEB83]">login</span>
          </Link>
          /
          <Link to="/register">
            <spna className="text-[#6EEB83]">register</spna>
          </Link>
        </p>
      </div>

      {/* <p className="lex text-xl text-center">Login / Register to create a new blog</p> */}
      {articles.length === 0 ? (
        <h1 className="text-center mt-20 lex text-6xl">No articles</h1>
      ) : (
        ""
      )}

      {articles.map((article) => {
        return (
          <div>
            <div
              key={article.id}
              className="mt-10  rounded-xl flex md:flex-row flex-col items-center justify-center gap-4 w-full"
            >
              <div className="overflow-hidden  ">
                <Link to={`/article/${article.id}`}>
                  <img
                    src={article.imageUrl}
                    className="  w-[300px]  object-cover"
                  />
                </Link>
              </div>

              <div className="w-full px-4 ">
                {user && user.uid === article.userId && (
                  <div className="flex justify-end p-1 cursor-pointer">
                    <Deleteblogs
                      className="float-right text-2xl w-full cursor-pointer"
                      id={article.id}
                      imageUrl={article.imageUrl}
                    ></Deleteblogs>
                  </div>
                )}

                <p className="dm text-[32px] text-[#6EEB83] ">
                  {article.title}
                </p>
                <div className="flex justify-between items-center w-full  pr-5">
                  <p className="lex text-[25px] text-gray-500">
                    by-{article.createdBy}
                  </p>
                  <p className="lex text-gray-500">
                    {article.createdAt.toDate().toDateString()}
                  </p>
                </div>
                <div className="mt-7">
                  <p className="text-[20px] lex text-gray-100 text-justify pb-4">
                    {article.description}
                  </p>
                </div>

                <div className="flex items-center mb-4 gap-6 justify-end">
                  <Link to={`/article/${article.id}`}>
                    {" "}
                    <div className="flex items-center gap-1 text-xl lex">
                    
                      <TfiCommentAlt className="mt-1" />
                      <span>{article.comments?.length}</span>
                    </div>
                  </Link>
                  <div>
                    {user && (
                      <p className="text-xl lex flex items-center gap-1 w-full justify-end ">
                        {" "}
                        <Likeblog  id={article.id} likes={article.likes} />{" "}
                      {article.likes?.length}
                      </p>

                    )}

                    {
                      !user?<p className="lex text-xl ">{article.likes?.length} Likes
                      </p>:''
                    }
                
                  


                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Allblogs;