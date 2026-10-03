import { BsBriefcase } from "react-icons/bs";

function Experience() {
  const experiences = [
    {
      title: "Assistant Software Developer",
      company: "Lovely Professional University (LPU)",
      period: "Jul 2025 - Present",
      description:
        "Working on the Student UMS system using Next.js, React.js, TypeScript, and Material UI. Developing reusable UI components, tables, forms, dialogs, and integrating REST APIs.",
      current: true,
    },
    {
      title: "Web Developer Intern",
      company: "Ansh Infotech",
      period: "Jan 2025 - Jun 2025",
      description:
        "Worked on web development using the MERN stack. Assisted with student projects, implemented features, fixed bugs, and gained hands-on experience with React.js, Node.js, Express.js, and MongoDB.",
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white animate-fade-in">
          Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } mb-8 animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 z-10">
                {exp.current && (
                  <div className="absolute w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-400 animate-ping opacity-75 -inset-1"></div>
                )}
              </div>

              {/* Content */}
              <div
                className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-2">
                    <BsBriefcase className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />

                    <h3 className="text-xl font-semibold dark:text-white">
                      {exp.title}
                    </h3>
                  </div>

                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {exp.company}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {exp.period}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;