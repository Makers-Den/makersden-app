# Generate estimation based on Google Sheets data

#### 1. Create an estimation sheet

Each estimation starts with the estimation sheet. You can create your estimation sheet from the [Template Estimation](https://docs.google.com/spreadsheets/d/1-LS9Nz0pVSRI-SzNmAYGasjlWFmbHxM5Z7gAg0bjulI/edit#gid=0). If you're added to the [Makers' Den App shared drive](https://drive.google.com/drive/u/0/folders/0AMa-Ta1Xov41Uk9PVA), then you can use `from template` option in order to create the estimation. Otherwise, you will have to copy the content of the [Template Estimation](https://docs.google.com/spreadsheets/d/1-LS9Nz0pVSRI-SzNmAYGasjlWFmbHxM5Z7gAg0bjulI/edit#gid=0) and paste it to your sheet.

#### 2. Fill the sheet with the data

Sheets must follow strict format requirements in order to be easily parsed by our backend. If we had to create an e-commerce website for the company selling guitars, this is how the estimation could look like [link](https://docs.google.com/spreadsheets/d/1X4semvPm9mZxQ9OyGkGG8sf-roLQ8wMuadHSYc7WYLc/edit#gid=0)

@TODO Add image

1. Title - what do we estimate
2. Organization - for whom do we estimate
3. Description - detailed description of what this estimation is about
4. Section title - estimation usually has multiple sections, every section has a title, optional description, and a list of tasks
5. Section description - optional detailed description of the section
6. Task title - a single estimated unit of work
7. Task description - optional detailed description of the task
8. Optimistic days - how many days (1 day = 8 hours) will the task take in the optimistic scenario?
9. Nominal days - how many days (1 day = 8 hours) will the task take in the nominal scenario?
10. Pessimistic days - how many days (1 day = 8 hours) will the task take in the pessimistic scenario?
11. Expected days - what is the expected amount of days (1 day = 8 hours) to finish the task? This value is calculated automatically based on optimistic/nominal/pessimistic values.
12. Total - the total of the optimistic/nominal/pessimistic/expected days. Please note that adding new sections/tasks may not sum them automatically. You need to make sure that the total formulas take into account all of the rows. 
13. Is included - indicates if tasks should be included in the total section or not

#### 3. Export estimation data to the Storyblok

After finishing work inside the Google Sheets, you need to export the data to Storyblok. Before that, make sure that anyone can access your sheet as a viewer. Otherwise, our server will not have permission to read the sheet. To do the export, you will need a sheet id. You can get it from the sheet URL. For example, sheet id for URL `https://docs.google.com/spreadsheets/d/1X4semvPm9mZxQ9OyGkGG8sf-roLQ8wMuadHSYc7WYLc/edit#gid=0` is `1X4semvPm9mZxQ9OyGkGG8sf-roLQ8wMuadHSYc7WYLc`. To do the export, make a request to the `https://app.makersden.io/api/estimations/<estimation-id>` (change base URL to `https://staging.app.makersden.io/api/estimations/<estimation-id>`/`http://localhost:3000/api/estimations/<sheet-id>` if you need to). For the guitar e-commerce example, the URL will be `https://app.makersden.io/api/estimations/1X4semvPm9mZxQ9OyGkGG8sf-roLQ8wMuadHSYc7WYLc`.

If there is some problem with your sheet format, the API will return an error. Otherwise, it should return a JSON similar to this.

```
{
    "isError": false,
    "secret": "guitarex-cozw"
}
```

The secret  (in this example `guitarex-cozw`) is a unique identifier of the estimation. Now you should be able to find your estimation inside the [Storyblok](https://app.storyblok.com/#/me/spaces/190168/stories/0/0/index/0?currentPage=1&perPage=25). Guitar e-commerce Storyblok content looks like [this](https://app.storyblok.com/#/me/spaces/190168/stories/0/0/270910923). 

In the Storyblok you can adjust the estimation, for example by adding loom video or photos.

#### 4. View estimation

When your estimation is ready, prepare an estimation link `https://app.makersden.io/estimations/<estimation-secret>` and that's it! There is an estimation of the guitar e-commerce: [https://app.makersden.io/estimations/guitarex-cozw](https://app.makersden.io/estimations/guitarex-cozw).

You can also see the estimation by going to [https://app.makersden.io](https://app.makersden.io) and entering the secret (`guitarex-cozw`) into the secret input.
