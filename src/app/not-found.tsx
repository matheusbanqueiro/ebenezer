import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="grid h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <Image
        src={"/assets/storyset/cuate/404-error.svg"}
        alt={"Erro 404"}
        width={300}
        height={300}
        className=""
      />
      <div className="text-center">
        <p className="text-3xl font-semibold text-sky-500 ">
          Ops! Erro: 404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-sky-800 sm:text-5xl">
          Página Inexistente
        </h1>
        <p className="mt-6 text-base leading-7 text-neutral-600">
          Lamentamos, mas não conseguimos encontrar a página que procura.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-uni-secondary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  hover:bg-uni-secondary-500/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:focus-visible:outline-web-orange-500 focus-visible:outline-uni-secondary-500"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
