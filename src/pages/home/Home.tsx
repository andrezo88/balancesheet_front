import Navbar from "../../components/navbar/Navbar";

export default function Home() {

  return (
    <>
      <Navbar />
      <section className="min-h-screen dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Solução definitiva para o gerenciamento financeiro pessoal</h2>
            <p className="mb-4">Com a vida moderna trazendo uma infinidade de despesas diárias, manter o controle do seu dinheiro pode ser um desafio.
              É aqui que entramos.</p>
            <p>O balanceSheets é projetado para simplificar a maneira como você acompanha suas finanças,
              permitindo que você se concentre no que realmente importa.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content" />
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Faça do seu jeito e quando quiser</h2>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>

              <h3 className="mb-2 text-xl font-bold dark:text-white">Registro de Despesas Rápido e Fácil</h3>
              <p className="text-gray-500 dark:text-gray-400">Interface intuitiva para adicionar despesas em poucos cliques.</p>
              <p className="text-gray-500 dark:text-gray-400">Categorias personalizáveis para organizar despesas (alimentação, transporte, lazer, etc.).</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Acompanhamento em Tempo Real</h3>
              <p className="text-gray-500 dark:text-gray-400">Atualizações instantâneas do saldo após cada lançamento.</p>
              <p className="text-gray-500 dark:text-gray-400">Visualização de despesas recentes na página inicial.</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Filtragem por Data</h3>
              <p className="text-gray-500 dark:text-gray-400">Capacidade de visualizar despesas por dia, semana, mês ou intervalo personalizado.</p>
              <p className="text-gray-500 dark:text-gray-400">Calendário interativo para seleção rápida de datas.</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Relatórios Detalhados(Em breve)</h3>
              <p className="text-gray-500 dark:text-gray-400">Gráficos e tabelas para análise de gastos por categoria.</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Segurança de dados</h3>
              <p className="text-gray-500 dark:text-gray-400">Criptografia de ponta a ponta para proteger informações pessoais.</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Orçamento Personalizado(Em breve)</h3>
              <p className="text-gray-500 dark:text-gray-400">Ferramentas para definir orçamentos mensais ou por categoria.</p>
              <p className="text-gray-500 dark:text-gray-400">Alertas quando o gasto se aproxima ou excede o orçamento estabelecido.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}