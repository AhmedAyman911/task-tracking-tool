import { Link } from "react-router-dom";
const ScrumSide = () => {
    return (
        <div className="fixed top-[57px] mt-2 left-0 h-[calc(100vh-60px)] w-[250px] bg-[#dde6f4] text-black p-5 font-sans shadow-md z-50">
            <ul className="space-y-4">
                <li>
                    <Link
                        to="/backlog"
                        className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
                    >
                        <img
                            src="/src/assets/backlog.png"
                            alt="Backlog Icon"
                            className="w-6 h-6 mr-2"
                        />
                        Backlog
                    </Link>
                </li>
                <li>
                    <Link
                        to="/scrumtime"
                        className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
                    >
                        <img
                            src="src/assets/progress.png"
                            alt="Sprints Icon"
                            className="w-6 h-6 mr-2"
                        />
                        Sprints
                    </Link>
                </li>
                <li>
                    <Link
                        to="/scrumDashboard"
                        className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
                    >
                        <img
                            src="/src/assets/time2.png"
                            alt="Dashboard Icon"
                            className="w-6 h-6 mr-2"
                        />
                        Dashboard
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default ScrumSide;