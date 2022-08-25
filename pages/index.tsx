import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../component/shared/layout";
import {ObjectToClass} from "../lib/shared/ObjectToClass";
import {getPosts} from "../lib/posts/postsHook";
import {PostsDto} from "../services/dto/response/PostsDto";
import {PostDto} from "../services/dto/response/PostDto";

export async function getServerSideProps({ req, res }) {
  const objToClassDTO = new ObjectToClass();
  let posts = null;
  let errors = null;
  try {

    posts = objToClassDTO.toClass((await (await getPosts(res, req)).json()), PostsDto);
  } catch (error) {
    errors = error;
  }
console.log(posts, 23, errors);
  return { props: { posts: JSON.parse(JSON.stringify(posts)), } }
}

function ListItem(props) {
  // Dobrze! Nie ma potrzeby definiowania klucza tutaj:
  return <li>{props.value}</li>;
}

export default function Home({posts}) {
  const listItems = posts.items.map((item: PostDto) =>
      // Dobrze! Klucz powinien zostać ustawiony na elementach wewnątrz tablicy.
      <ListItem key={item._id} value={item.title} />
  );

  return (
      <Layout>
        <div className={styles.container}>
          <Head>
            <title>Post wall!</title>
            <meta name="description" content="With great power, great responsible" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>

            <div className={styles.grid}>
              <ul>
                {listItems}
              </ul>
            </div>
          </main>

          <footer className={styles.footer}>

          </footer>
        </div>
    </Layout>
  );
}
