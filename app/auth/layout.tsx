
import FlickeringGrid from "@/components/ui/flickering-grid"

const AuthLayout = async({
    children
}:{children: React.ReactNode},
  
) => {

  return (

    <div className="relative flex items-center justify-center ">
      <FlickeringGrid
        className="z-0 absolute inset-0  min-w-screen lg:w-full    min-h-screen"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        
      />
      <div className="z-50  mt-10 lg:t-20">
       {children}
      </div>
    </div>
    
  )
}
 


export default AuthLayout