import { Link } from "react-router-dom";

const KanbanSide = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user info from localStorage
  const isManager = user?.role === "manager";

  return (
    <div className="fixed top-[57px] mt-2 left-0 h-[calc(100vh-60px)] w-[250px] bg-[#dde6f4] text-black p-5 font-sans shadow-md z-50">
      <ul className="space-y-4">
        <li>
          <Link
            to="/goal"
            className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
          >
            <img
              src="/src/assets/target.png"
              alt="Board Icon"
              className="w-6 h-6 mr-2"
            />
            Goal
          </Link>
        </li>
        <li>
          <Link
            to={isManager ? "/kanbanBoard" : "/devBoard"}
            className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
          >
            <img
              src="src/assets/kanban.png"
              alt="Board Icon"
              className="w-6 h-6 mr-2"
            />
            Board
          </Link>
        </li>
        <li>
          <Link
            to={isManager ? "/ListKanban" : "/devList"}
            className="flex items-center text-black text-base no-underline p-2 rounded-md hover:bg-[#0052cc] hover:text-white transition"
          >
            <img
              src="/src/assets/menu.png"
              alt="List Icon"
              className="w-6 h-6 mr-2"
            />
            List
          </Link>
        </li>
        {isManager && (
          <li>
            <Link
              to="/kanbanDashboard"
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
        )}
      </ul>
    </div>
  );
};

export default KanbanSide;
