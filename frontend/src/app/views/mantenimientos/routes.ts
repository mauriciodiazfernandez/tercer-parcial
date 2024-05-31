import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Base'
        },
        children: [
            {
                path: '',
                redirectTo: 'cards',
                pathMatch: 'full'
            },
            {
                path: 'mantenimiento',
                loadComponent: () => import('./mantenimiento/mantenimiento.component').then(m => m.MantenimientoComponent),
                data: {
                    title: 'Mantenimiento'
                }
            },
            {
                path: 'activos',
                loadComponent: () => import('./activos/activos.component').then(m => m.ActivosComponent),
                data: {
                    title: 'Activos'
                }
            },
            {
                path: 'reporteuno',
                loadComponent: () => import('./reporteuno/reporteuno.component').then(m => m.ReporteunoComponent),
                data: {
                    title: 'Reportes'
                }
            },
            {
                path: 'reportedos',
                loadComponent: () => import('./reportedos/reportedos.component').then(m => m.ReportedosComponent),
                data: {
                    title: 'ReportesDos'
                }
            },
        ]
    }
]