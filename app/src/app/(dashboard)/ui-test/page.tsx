'use client'

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Badge,
  Textarea,
  Progress,
  Separator,
  Spinner,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui"

const formSchema = z.object({
  name: z.string().min(2, "Nimi peab olema vähemalt 2 tähemärki"),
  email: z.string().email("Vigane e-posti aadress"),
  message: z.string().min(10, "Sõnum peab olema vähemalt 10 tähemärki"),
})

export default function UITestPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    alert("Vorm edastatud! Vaata konsooli.")
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">UI Komponendid Test</h1>
        <p className="text-muted-foreground">
          Siin lehel on näited kõigist loodud komponentidest
        </p>
      </div>

      <Separator />

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Nupud (Buttons)</CardTitle>
          <CardDescription>Erinevad nupuvariantid</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Märgised (Badges)</CardTitle>
          <CardDescription>Staatuste ja silte näitavad märgised</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </CardContent>
      </Card>

      {/* Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Kaardid (Cards)</CardTitle>
          <CardDescription>
            Kaart komponendid sisuga, päise ja jalaga
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Näide kaart 1</CardTitle>
                <CardDescription>Lihtne sisu</CardDescription>
              </CardHeader>
              <CardContent>
                <p>See on kaardi sisu osa.</p>
              </CardContent>
              <CardFooter>
                <Button>Tegevus</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Näide kaart 2</CardTitle>
                <CardDescription>Veel üks näide</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Kaardid võivad sisaldada mis tahes sisu.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progressi riba (Progress)</CardTitle>
          <CardDescription>Edenemise näitamine</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label>25% valmis</Label>
            </div>
            <Progress value={25} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>50% valmis</Label>
            </div>
            <Progress value={50} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>75% valmis</Label>
            </div>
            <Progress value={75} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>100% valmis</Label>
            </div>
            <Progress value={100} />
          </div>
        </CardContent>
      </Card>

      {/* Spinner */}
      <Card>
        <CardHeader>
          <CardTitle>Laadimise spinner (Spinner)</CardTitle>
          <CardDescription>Laadimise indikaatorid</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <Label>Small</Label>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <Label>Medium</Label>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <Label>Large</Label>
          </div>
        </CardContent>
      </Card>

      {/* Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>Vorm (Form)</CardTitle>
          <CardDescription>
            React Hook Form integratsiooniga vorm + Zod validatsioon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nimi</FormLabel>
                    <FormControl>
                      <Input placeholder="Sisesta nimi" {...field} />
                    </FormControl>
                    <FormDescription>Sinu täisnimi</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-post</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="nimi@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Sinu e-posti aadress</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sõnum</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Kirjuta oma sõnum siia..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Vähemalt 10 tähemärki</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit">Saada vorm</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Tühista
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      {/* Input & Textarea */}
      <Card>
        <CardHeader>
          <CardTitle>Sisestusväljad</CardTitle>
          <CardDescription>Input ja Textarea komponendid</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-demo">Input näide</Label>
            <Input id="input-demo" placeholder="Sisesta tekst..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="input-disabled">Disabled Input</Label>
            <Input
              id="input-disabled"
              placeholder="Disabled"
              disabled
              value="Ei saa muuta"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="textarea-demo">Textarea näide</Label>
            <Textarea
              id="textarea-demo"
              placeholder="Kirjuta pikk tekst siia..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Separator */}
      <Card>
        <CardHeader>
          <CardTitle>Eraldaja (Separator)</CardTitle>
          <CardDescription>Horisontaalne ja vertikaalne eraldaja</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>Tekst enne</p>
            <Separator className="my-4" />
            <p>Tekst pärast</p>
          </div>

          <div className="flex h-20 items-center gap-4">
            <p>Vasak</p>
            <Separator orientation="vertical" />
            <p>Parem</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
