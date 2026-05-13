import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-white pb-20 pt-20 lg:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center -mx-4">
          
          {/* Left Content Column */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="mb-12 lg:mb-0">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-[45px] lg:text-[50px] xl:text-[60px]">
                Build Your Brand with <span className="text-blue-600">Modern Solutions</span>
              </h1>
              <p className="mb-10 text-lg leading-relaxed text-gray-600">
                Hum aapki ideas ko reality mein badalte hain. Next.js aur Tailwind CSS ke saath fast, 
                secure aur responsive websites banwayein jo aapke business ko grow karein.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-lg bg-blue-600 px-8 py-4 text-center text-white font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  href="/portfolio"
                  className="rounded-lg border border-gray-300 px-8 py-4 text-center text-gray-700 font-semibold hover:bg-gray-50 transition duration-300"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image/Graphic Column */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative z-10 lg:ml-auto">
              {/* Aap yahan apni image ka path daal sakte hain */}
              <img
                src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_1280.png"
                alt="Hero Illustration"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Background Decoration (Optional) */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl border-2 border-blue-100"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;