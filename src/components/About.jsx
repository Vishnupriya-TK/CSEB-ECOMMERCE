const About = () => {
  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Welcome to ShopEase, your one-stop destination for all your shopping needs. 
            We're dedicated to providing you with the best shopping experience.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
              <p className="mt-2 text-gray-600">
                To provide high-quality products at competitive prices while ensuring 
                excellent customer service and satisfaction.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">Our Values</h3>
              <p className="mt-2 text-gray-600">
                Integrity, Quality, Customer Satisfaction, Innovation, and Teamwork.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">Why Choose Us</h3>
              <p className="mt-2 text-gray-600">
                Wide range of products, competitive pricing, fast delivery, and excellent 
                customer support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
