import type { NextPage } from "next";
import { Button } from "@material-tailwind/react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Book } from "../type/Book";
import { useSelector, useDispatch } from "react-redux";
import { setBooks, deleteBook } from "../src/app/store";

import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useEffect } from "react";

interface HomePage {
    data: Book[];
}

const Home: NextPage<HomePage> = ({ data }) => {
    const bookList = useSelector((state: any) => state.books) as Book[];
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (data?.length) {
    //         dispatch(setBooks(data));
    //     }
    // }, []);

    console.log("bookList111", bookList);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {bookList?.map(({ id, name, price, category, description }) => (
                    <Card className="w-96" key={id}>
                        <CardBody>
                            <Typography variant="h5" className="mb-2">
                                {name}
                            </Typography>
                            <Typography>{category}</Typography>
                            <Typography>{description}</Typography>
                        </CardBody>
                        <CardFooter divider className="flex items-center justify-between py-3">
                            <Typography variant="small">${price}</Typography>
                            <Button onClick={() => dispatch(deleteBook(id))}>Delete</Button>
                        </CardFooter>
                    </Card>
                ))}
                <Link href="/create">
                    <a>
                        <Button>Add a book</Button>
                    </a>
                </Link>
            </main>
        </div>
    );
};

export async function getServerSideProps() {
    // Fetch data from external API
    // const res = await fetch(`https://.../data`);
    // const data = await res.json();
    const data: Book[] = [
        {
            id: "vwev",
            name: "https",
            price: 11,
            category: "Book",
            description: "Book description",
        },
    ];

    // Pass data to the page via props
    return { props: { data } };
}

export default Home;