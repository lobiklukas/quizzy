import NavBar from "../components/LandingPage/NavBar"
import { useTheme } from "../hooks/useTheme";

function About() {
    const { theme, setTheme } = useTheme();
    return (
        <>
              <NavBar theme={theme} setTheme={setTheme} />
      <div className="pt-32"></div>
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">About Quizzy</h1>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="mb-4">At Quizlet, our mission is to provide a seamless and engaging learning environment that fosters knowledge acquisition and retention. We believe that learning should be accessible, enjoyable, and personalized to meet the unique needs of each learner. By leveraging the power of technology, we aim to revolutionize the way people study and ultimately empower them to reach their full potential.</p>
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Interactive Flashcards</h3>
                    <p >Quizzy&apos;s interactive flashcards feature allows users to create, customize, and share flashcard sets for efficient memorization and active recall. With the ability to add images, audio, and definitions, learners can reinforce their understanding of key concepts and vocabulary in an engaging manner.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Learn Mode</h3>
                    <p >The Learn Mode feature in Quizlet provides an adaptive learning experience by presenting users with interactive study sessions. Learners can test their knowledge by answering questions, and the application adapts the difficulty level based on their performance, ensuring effective learning and retention.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Practice Quizzes</h3>
                    <p >Quizlet offers practice quizzes that enable users to test their understanding and assess their progress. These quizzes can be customized to focus on specific topics, allowing learners to target areas that require reinforcement. Immediate feedback and detailed explanations help users identify areas for improvement and solidify their understanding.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Collaborative Study Tools</h3>
                    <p >Collaboration is at the heart of Quizlet. Users can create and join study groups to collaborate with classmates, friends, or other learners who share similar learning goals. By working together, learners can benefit from different perspectives, support each other&apos;s learning journey, and maximize their overall success.</p>
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Team</h2>
                <p className="mb-4">Our dedicated team of developers, designers, and educators is passionate about creating an exceptional learning experience. We strive to continuously improve Quizlet by incorporating user feedback, implementing the latest educational research, and leveraging cutting-edge technologies. Our team&apos;s shared vision is to empower learners worldwide and make education an exciting and accessible journey for all.</p>
                <h2 className="text-2xl font-bold mb-4">Get Started with Quizlet</h2>
                <p className="mb-4">Are you ready to revolutionize your learning experience? Join Quizlet today and unlock the power of interactive studying, adaptive learning, and collaborative tools. Whether you&apos;re a student, educator, or lifelong learner, Quizlet is here to support your educational goals and help you excel in your academic pursuits.</p>
                <p className="mb-4">Start your learning journey with Quizlet now and embrace a new era of interactive and effective studying.</p>
            </div>
        </div>
        </>
    )
}

export default About