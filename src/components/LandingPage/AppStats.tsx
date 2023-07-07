import {
  AcademicCapIcon,
  CubeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

interface IAppStatsProps {
  registeredUsers: number;
learnedCards: number;
numOfQuizes: number;
}

function AppStats({ registeredUsers, learnedCards, numOfQuizes }: IAppStatsProps) {
  return (
    <div className="my-16 bg-base-300 py-24">
      <section className="container mx-auto flex">
        <div className="stats stats-vertical mx-auto shadow lg:stats-horizontal">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <UsersIcon className="inline-block h-8 w-8 stroke-current" />
            </div>
            <div className="stat-title">Registered users</div>
            <div className="stat-value">{registeredUsers}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <AcademicCapIcon className="inline-block h-8 w-8 stroke-current" />
            </div>
            <div className="stat-title">Created flashcards</div>
            <div className="stat-value">{learnedCards}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <CubeIcon className="inline-block h-8 w-8 stroke-current" />
            </div>
            <div className="stat-title">Created quizes</div>
            <div className="stat-value">{numOfQuizes}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AppStats;
