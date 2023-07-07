import {
  AcademicCapIcon,
  CubeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function AppStats() {
  return (
    <div className="my-16 bg-base-300 py-24">
      <section className="container mx-auto flex">
        <div className="stats stats-vertical mx-auto shadow lg:stats-horizontal">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <UsersIcon className="inline-block h-8 w-8 stroke-current" />
            </div>
            <div className="stat-title">Registered users</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <AcademicCapIcon className="inline-block h-8 w-8 stroke-current" />
            </div>
            <div className="stat-title">Learned flashcards</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <CubeIcon className="inline-block h-8 w-8 stroke-current" />
            </div>
            <div className="stat-title">Created quizes</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AppStats;
