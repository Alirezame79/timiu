import axios from "axios";
import { Rubik } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "../404";
import Head from "next/head";
import { useRouter } from "next/router";

const rubik = Rubik({ subsets: ["arabic"] });

export default function Post() {
  const [post, setPost] = useState<Post>();
  const [author, setAuthor] = useState<PostAuthor>();
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchRequest() {
      if (params === null) return;
        
      try {
        const responsePost = await axios.post("http://localhost:5000/post/", {
          id: params.id
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        console.log(responsePost)
        
        const responseAuthor = await axios.post("http://localhost:5000/post-author/", {
          id: "1"
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        console.log(responseAuthor)
  
        if (responsePost.status === 200 && responseAuthor.status === 200) {
          setPost(responsePost.data)
          setAuthor(responseAuthor.data)
        }
      } catch (error) {
        console.log(error)
        // @ts-ignore comment
        if (error.response.status === 403) {
          setNotFound(true)
        }
      }
    }

    console.log(params)
    fetchRequest();
  }, [params])

  function editPostClicked() {
    router.push('/post/edit/' + params.id);
  }

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <main>
        {notFound && <NotFound />}
        {post !== undefined && !notFound && <div className={`postContainer ${rubik.className}`}>
          <img className="postHeadImg" src={post.image} alt="post topic" />
          <h3 onClick={editPostClicked}>{post.title}</h3>

          {post.body.sort((a, b) => a.index > b.index ? 1 : -1).map((element) => {
            return (
              <div className="postEachElement" key={element.index}>
                {element.type === "text" && <p>{element.data}</p>}
                {element.type === "topic" && <h4>{element.data}</h4>}
                {element.type === "image" && <img src={element.data} />}
              </div>
            )
          })}

          <div className="postAuthorContainer">
            <img src={author?.image} alt="author image" width={100} height={100}/>
            <h5>{author?.name}</h5>
            <p>{author?.detail}</p>
          </div>

          <div className="postReactionContainer">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M348.45,432.7H261.8a141.5,141.5,0,0,1-49.52-8.9l-67.5-25.07a15,15,0,0,1,10.45-28.12l67.49,25.07a111.79,111.79,0,0,0,39.08,7h86.65a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30H368.9a14.21,14.21,0,1,0,0-28.42,15,15,0,0,1,0-30h20.44a14.21,14.21,0,0,0,10.05-24.26,14.08,14.08,0,0,0-10.05-4.16,15,15,0,0,1,0-30h20.45a14.21,14.21,0,0,0,10-24.26,14.09,14.09,0,0,0-10-4.17H268.15A15,15,0,0,1,255,176.74a100.2,100.2,0,0,0,9.2-29.33c3.39-21.87-.79-41.64-12.42-58.76a12.28,12.28,0,0,0-22.33,7c.49,51.38-23.25,88.72-68.65,108a15,15,0,1,1-11.72-27.61c18.72-8,32.36-19.75,40.55-35.08,6.68-12.51,10-27.65,9.83-45C199.31,77,211,61,229.18,55.34s36.81.78,47.45,16.46c24.71,36.36,20.25,74.1,13.48,97.21H409.79a44.21,44.21,0,0,1,19.59,83.84,44.27,44.27,0,0,1-20.44,58.42,44.27,44.27,0,0,1-20.45,58.43,44.23,44.23,0,0,1-40,63Z"/><path d="M155,410.49H69.13a15,15,0,0,1-15-15V189.86a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V395.49A15,15,0,0,1,155,410.49Zm-70.84-30H140V204.86H84.13Z"/></g></svg>
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M242.28,427.39a43.85,43.85,0,0,1-13.1-2c-18.22-5.69-29.87-21.64-29.69-40.62.16-17.35-3.15-32.5-9.83-45-8.19-15.33-21.83-27.13-40.55-35.08A15,15,0,1,1,160.83,277c45.4,19.26,69.14,56.6,68.65,108a12.28,12.28,0,0,0,22.33,7c28.34-41.71,3.47-87.63,3.22-88.09a15,15,0,0,1,13.12-22.27H409.79a14.22,14.22,0,0,0,0-28.43H389.34a15,15,0,1,1,0-30,14.2,14.2,0,0,0,14.21-14.21,14.23,14.23,0,0,0-14.21-14.21H368.9a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H348.45a15,15,0,0,1,0-30,14.21,14.21,0,1,0,0-28.42H261.8a111.69,111.69,0,0,0-39.07,7l-67.5,25.07A15,15,0,0,1,144.78,82l67.5-25.07A141.5,141.5,0,0,1,261.8,48h86.65a44.25,44.25,0,0,1,40,63,44.27,44.27,0,0,1,20.45,58.43,44.27,44.27,0,0,1,20.44,58.42,44.21,44.21,0,0,1-19.59,83.84H290.11c6.77,23.11,11.23,60.85-13.48,97.22A41.21,41.21,0,0,1,242.28,427.39Z"/><path d="M155,305.85H69.13a15,15,0,0,1-15-15V85.21a15,15,0,0,1,15-15H155a15,15,0,0,1,15,15V290.85A15,15,0,0,1,155,305.85Zm-70.84-30H140V100.21H84.13Z"/></g></svg>
            <svg version="1.1" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><title/><desc/><defs/><g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"><g fill="#000000" id="Core" transform="translate(-129.000000, -381.000000)"><g id="report" transform="translate(129.000000, 381.000000)"><path d="M12.7,0 L5.3,0 L0,5.3 L0,12.8 L5.3,18 L12.8,18 L18.1,12.7 L18.1,5.3 L12.7,0 L12.7,0 Z M9,14.3 C8.3,14.3 7.7,13.7 7.7,13 C7.7,12.3 8.3,11.7 9,11.7 C9.7,11.7 10.3,12.3 10.3,13 C10.3,13.7 9.7,14.3 9,14.3 L9,14.3 Z M10,10 L8,10 L8,4 L10,4 L10,10 L10,10 Z" id="Shape"/></g></g></g></svg>
          </div>
        </div>}
      </main>
    </>
  )
}