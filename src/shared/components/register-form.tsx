// 'use client';

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { cn } from "@/shared/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAuthContext } from "@/presentation/providers/auth-provider";
// import { registerSchema, RegisterFormData } from "@/shared/validators/auth.validators";
// import { APP_ROUTES } from "@/shared/constants";

// export function RegisterForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [isLoading, setIsLoading] = useState(false);
//   const { register: registerUser, error } = useAuthContext();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async (data: RegisterFormData) => {
//     try {
//       setIsLoading(true);
//       const { confirmPassword, ...registerData } = data;
//       await registerUser(registerData);
//     } catch (error) {
//       // Error is handled by the auth context
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Criar uma conta</CardTitle>
//           <CardDescription>
//             Preencha os dados abaixo para criar sua conta
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-6">
//               {error && (
//                 <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
//                   {error}
//                 </div>
//               )}
              
//               <div className="grid gap-3">
//                 <Label htmlFor="email">E-mail</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="seu@email.com"
//                   {...register("email")}
//                   className={errors.email ? "border-red-500" : ""}
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-red-600">{errors.email.message}</p>
//                 )}
//               </div>
              
//               <div className="grid gap-3">
//                 <Label htmlFor="password">Senha</Label>
//                 <Input 
//                   id="password" 
//                   type="password"
//                   placeholder="Mínimo 6 caracteres"
//                   {...register("password")}
//                   className={errors.password ? "border-red-500" : ""}
//                 />
//                 {errors.password && (
//                   <p className="text-sm text-red-600">{errors.password.message}</p>
//                 )}
//               </div>
              
//               <div className="grid gap-3">
//                 <Label htmlFor="confirmPassword">Confirmar Senha</Label>
//                 <Input 
//                   id="confirmPassword" 
//                   type="password"
//                   placeholder="Digite a senha novamente"
//                   {...register("confirmPassword")}
//                   className={errors.confirmPassword ? "border-red-500" : ""}
//                 />
//                 {errors.confirmPassword && (
//                   <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
//                 )}
//               </div>
              
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Criando conta..." : "Criar conta"}
//               </Button>
//             </div>
            
//             <div className="mt-4 text-center text-sm">
//               Já tem uma conta?{" "}
//               <Link 
//                 href={APP_ROUTES.LOGIN} 
//                 className="underline underline-offset-4 hover:text-primary"
//               >
//                 Entrar
//               </Link>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
