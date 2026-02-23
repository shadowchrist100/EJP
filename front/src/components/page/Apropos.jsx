import Nav from "../common/Nav";
import { Contact } from "../../Index";


const MissionSection = () => {
    const missions = [
        {
            title: "SAUVER",
            description: "Amener la jeunesse à recevoir la véritable lumière qu'est Jesus-Christ"
        },
        {
            title: "TRANSFORMER",
            description: "(Re)construire le système de pensées des jeunes pour les amener à la conformité à Christ"
        },
        {
            title: "CONQUÉRIR",
            description: "Imposer les standards du royaume de Dieu afin d'établir la domination de Christ dans nos territoires, à travers l'evangelisation et l'influence"
        }
    ];

    return (
        <section className="py-12 px-4 ">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Pourquoi existons-nous ?
                    </h2>
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    </div>
                    <div className="mb-8">
                        <div className="h-8"></div>
                    </div>
                </div>
                {/* Missions Grid */}
                <div className="space-y-12">
                {missions.map((mission, index) => (
                    <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border-l-4 border-blue-600"
                    >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {mission.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {mission.description}
                    </p>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
    };


const Apropos = ()=>{
    return (
        <section className="background-dark">
            <div className="min-h-screen">
                <header className="fixed top-0 right-0 left-0 z-50">
                    <Nav />
                </header>
                <section className="py-12   ">
                    <div className=" mt-5 py-12 min-h-screen flex  justify-center bg-white">
                        <div className="py-8 ">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center text-gray-900">Qui sommes nous ?</h2>
                            <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12">
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                                Nous sommes une église de jeunes créée sous l'inspiration de l'Esprit par l'apôtre Yvan Castanou avec le fardeau de voir une nouvelle génération se lever et conquérir les territoires.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <MissionSection />
                </section>
                <section className="py-12 bg-white">
                    <Contact />
                </section>
            </div>
        </section>
    )
}

export default Apropos;